<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import IndustryApi from '@/moduleApi/modules/IndustryApi'
import PostApi from '@/moduleApi/modules/PostApi'
import UserApi from '@/moduleApi/modules/UserApi'

import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import xlsx from 'xlsx/dist/xlsx.full.min'

import modelData from './EmployeeAppliedJobsModel'

const moduleName = 'Việc làm đã ứng tuyển'

const router = useRouter()
const rankList = DataService.rankList
const experienceList = DataService.experienceList
const workPlaceList = DataService.workPlaceList
const workFormList = DataService.workFormList

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formSearchData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})

const industryList = reactive({ value: [] })

const convertDataExport = (data) => {
  let arr = []
  data.forEach((record) => {
    const o = {
      'Họ và tên': record.userDTO.userInfoDTO.fullName,
      'Lĩnh vực ứng tuyển': record.career,
      'Vị trí ứng tuyển': record.positionOffer,
      'Thời gian nộp': record.timeSubmitFormat,
      'Mức lương': record.offerSalary
        ? MethodService.formatCurrencyShort(record.offerSalary)
        : 0,
      'Số năm kinh nghiệm': record.experienceNumber,
      'Địa điểm làm việc': record.workAddress,
      'Hình thức làm việc': record.workForm,
    }
    arr.push(o)
  })
  return arr
}

const exportExcel = () => {
  const dataExport = convertDataExport(tableRules.data)
  if (!dataExport || dataExport.length == 0) {
    return
  }
  const XLSX = xlsx
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(dataExport)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
  // Set column width
  worksheet['!cols'] = []
  for (const property in dataExport[0]) {
    if (property === 'Địa điểm làm việc' || property === 'Lĩnh vực ứng tuyển') {
      const max_width = dataExport.reduce(
        (w, r) => Math.max(w, property.length),
        10,
      )
      worksheet['!cols'].push({ wch: max_width })
    } else {
      const max_width = dataExport.reduce(
        (w, r) => Math.max(w, r[`${property}`].length),
        10,
      )
      worksheet['!cols'].push({ wch: max_width })
    }
  }

  XLSX.writeFile(workbook, 'Hồ sơ đã lưu.xlsx', { compression: true })
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        tableRules.skip = 0
        tableRules.page = 1
        await getAppliedJobsList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

// phân trang
const fn_tableSizeChange = (limit) => {
  tableRules.limit = limit
  fn_tableChangeOffset(1)
}
const fn_tableCurentChange = (page) => {
  fn_tableChangeOffset(page)
}
const fn_tablePrevClick = () => {
  // fn_tableChangeOffset(page);
}
const fn_tableNextClick = () => {
  // fn_tableChangeOffset(page);
}
const fn_tableChangeOffset = (page) => {
  tableRules.page = page
  tableRules.offset = (tableRules.page - 1) * tableRules.limit
  getAppliedJobsList()
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const getAppliedJobsList = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    ...tableRules.filters,
  }
  router.replace({
    name: moduleName,
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = await UserApi.getJobsApplied(filter)
  if (res.status == 200 && res.data.data) {
    tableRules.data = await changeData(res.data.data.data)
    tableRules.total = res.data.data.totalElements
  }
}

const changeData = (data) => {
  data.forEach((post) => {
    post.created = post.created
      ? MethodService.formatDate(post.created, 'date')
      : ''
    post.jobApplicationDeadline = post.jobApplicationDeadline
      ? MethodService.formatDate(post.jobApplicationDeadline, 'date')
      : ''
    post.salaryMinFormat = post.salaryMin
      ? MethodService.formatCurrencyShort(post.salaryMin)
      : '---'
    post.salaryMaxFormat = post.salaryMax
      ? MethodService.formatCurrencyShort(post.salaryMax)
      : '---'
  })
  return data
}

const handleAction = (type, rowData) => {
  if (type === 'view') {
    viewCandidateProfile(rowData)
  } else if (type === 'delete') {
    deletePost(rowData)
  }
}

const viewCandidateProfile = async (rowData) => {
  try {
    const res = await PostApi.increaseViewPost(rowData.id)
    if (res.status === 200) {
      // Go to detail
      router.push({
        name: 'Job detail',
        params: { id: rowData.id },
      })
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi điều hướng.',
      type: 'error',
    })
  }
}

const deletePost = async (rowData) => {
  ElMessageBox.confirm('Bạn có chắc muốn xóa tin tuyển dụng này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
    type: 'warning',
  })
    .then(async () => {
      const res = await UserApi.deleteJobsApplies(rowData.id)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Xóa thành công.',
          type: 'success',
          duration: 3000,
        })
        getAppliedJobsList()
      }
    })
    .catch(() => {})
}

const getIndustryList = async () => {
  try {
    const res = await IndustryApi.list('size=99999')
    if (res.status === 200) {
      industryList.value = res.data.data.data
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Có lỗi xảy ra khi tải dữ liệu.',
      type: 'error',
      duration: 3000,
    })
  }
}

onMounted(() => {
  getIndustryList()
  getAppliedJobsList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Việc làm đã ứng tuyển</h4>
            <div class="d-flex">
              <el-button type="primary" @click="toggleSearchBox">
                <el-icon class="me-2"><Search /></el-icon>
                Ẩn/hiện tìm kiếm
              </el-button>
              <!-- <el-button
                type="primary"
                plain
                @click="exportExcel"
                :disabled="tableRules.data.length == 0"
              >
                <el-icon class="me-2"><Download /></el-icon>
                Tải danh sách
              </el-button> -->
            </div>
          </div>
        </div>
      </template>

      <div class="main-body-search mx-3 mb-3">
        <b-collapse
          v-model="tableRules.showFormSearch"
          id="myFormSearch"
          class=""
        >
          <el-card>
            <el-form
              ref="ruleFormRef"
              :model="formSearchData.value"
              :rules="validSearchForm"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
            >
              <b-row>
                <b-col md="3">
                  <el-form-item label="Chức danh" prop="">
                    <el-input
                      v-model="formSearchData.value.title"
                      clearable
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Lĩnh vực làm việc" prop="">
                    <el-select
                      v-model="formSearchData.value.industryId"
                      placeholder="Chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in industryList.value"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Khu vực tuyển dụng" prop="">
                    <el-select
                      v-model="formSearchData.value.recruitmentArea"
                      placeholder="Chọn"
                      filterable
                    >
                      <el-option
                        v-for="item in workPlaceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item
                    label="Kinh nghiệm"
                    prop="recruitmentExperience"
                  >
                    <el-select
                      v-model="formSearchData.value.recruitmentExperience"
                      placeholder="Chọn"
                      filterable
                    >
                      <el-option
                        v-for="item in experienceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Mức lương tối thiểu" prop="">
                    <el-input
                      v-model="formSearchData.value.salaryMin"
                      placeholder="Vui lòng nhập"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Mức lương tối đa" prop="">
                    <el-input
                      v-model="formSearchData.value.salaryMax"
                      placeholder="Vui lòng nhập"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Cấp bậc" prop="level">
                    <el-select
                      v-model="formSearchData.value.level"
                      placeholder="Chọn"
                      filterable
                    >
                      <el-option
                        v-for="item in rankList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Hình thức làm việc" prop="">
                    <el-select
                      v-model="formSearchData.value.workForm"
                      placeholder="Chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in workFormList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
              </b-row>

              <div class="text-center">
                <el-button type="primary" @click="submitFormSearch(ruleFormRef)"
                  >Tìm kiếm</el-button
                >
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableRules.data">
        <el-table-column prop="title" label="Tên tin đăng" min-width="180" />
        <el-table-column
          prop="created"
          label="Ngày đăng"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="jobApplicationDeadline"
          label="Thời hạn nộp"
          min-width="120"
          align="center"
        />
        <!-- <el-table-column prop="approve_time" label="Lượt nộp" align="center" />
        <el-table-column prop="read_time" label="Lượt xem" align="center" /> -->
        <el-table-column
          prop="numberOfRecruits"
          label="Số lượng tuyển"
          align="center"
          min-width="130"
        />
        <el-table-column prop="level" label="Cấp bậc" min-width="120" />
        <el-table-column
          prop="recruitmentArea"
          label="Khu vực tuyển"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="recruitmentAge"
          label="Độ tuổi"
          align="center"
          min-width="100px"
        />
        <el-table-column
          prop="recruitmentGender"
          label="Giới tính"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="salaryMinFormat"
          label="Thu nhập tối thiểu"
          align="right"
          min-width="150"
        />
        <el-table-column
          prop="salaryMaxFormat"
          label="Thu nhập tối đa"
          align="right"
          min-width="150"
        />
        <!-- <el-table-column
          prop="post_status"
          label="Tình trạng tin"
          min-width="150"
          show-overflow-tooltip
          align="center"
        /> -->
        <el-table-column prop="necessarySkills" label="Khác" min-width="200" />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="120"
        >
          <template #default="scope">
            <div class="">
              <el-button size="small" @click="handleAction('view', scope.row)" title="Xem"
                ><CIcon icon="cilFindInPage"
              /></el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="handleAction('delete', scope.row)"
                title="Xóa"
                ><CIcon icon="cilTrash"
              /></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-3 mb-3" style="float: right">
        <el-pagination
          small
          v-model:currentPage="tableRules.page"
          v-model:pageSize="tableRules.limit"
          :page-sizes="tableRules.lengthMenu"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(tableRules.total)"
          @size-change="fn_tableSizeChange"
          @current-change="fn_tableCurentChange"
          @prev-click="fn_tablePrevClick"
          @next-click="fn_tableNextClick"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
:deep .avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
:deep .avatar-uploader .el-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.1s ease;
}

:deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

:deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>
