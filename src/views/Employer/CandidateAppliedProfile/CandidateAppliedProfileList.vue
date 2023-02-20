<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import UserApi from '@/moduleApi/modules/UserApi'
import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'

import { ElNotification, ElMessageBox } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import xlsx from 'xlsx/dist/xlsx.full.min'

import modelData from './CandidateAppliedProfileModel'

const moduleName = 'Hồ sơ ứng viên ứng tuyển'

const router = useRouter()

const mainJobList = DataService.mainJobList
const experienceList = DataService.experienceList
const workPlaceList = DataService.workPlaceList
const workFormList = DataService.workFormList

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formSearchData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})

const allAppliesCVList = reactive({ value : [] })

const convertDataExport = (data) => {
  let arr = []
  data.forEach((record) => {
    const o = {
      'Họ và tên': record.userDTO.userInfoDTO.fullName,
      'Lĩnh vực ứng tuyển': record.career,
      'Vị trí ứng tuyển': record.positionOffer,
      'Cấp bậc mong muốn': record.levelDesire,
      'Mức lương': record.offerSalary
        ? MethodService.formatCurrency(record.offerSalary)
        : 0,
      'Số năm kinh nghiệm': record.experienceNumber,
      'Địa điểm làm việc': record.workAddress,
      'Hình thức làm việc': record.workForm,
    }
    arr.push(o)
  })
  return arr
}

const exportExcel = async () => {
  await getAllAppliesCVList()
  const dataExport = convertDataExport(allAppliesCVList.value)
  if (!dataExport || dataExport.length == 0) {
    return
  }
  const XLSX = xlsx
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(dataExport)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hồ sơ ứng viên ứng tuyển')
  // Set column width
  worksheet['!cols'] = []
  for (const property in dataExport[0]) {
    if (
      property === 'Địa điểm làm việc' ||
      property === 'Lĩnh vực ứng tuyển' ||
      property === 'Số năm kinh nghiệm' ||
      property === 'Cấp bậc mong muốn'
    ) {
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
  XLSX.writeFile(workbook, 'Hồ sơ ứng viên ứng tuyển.xlsx', {
    compression: true,
  })
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
        await getAppliesCVList()
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
  getAppliesCVList()
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const getAllAppliesCVList = async () => {
  try {
    const res = await UserApi.getAppliedCVEmloyeeList('size=99999')
    if (res.status === 200 && res.data && res.data.data && res.data.data.data) {
      allAppliesCVList.value = await changeData(res.data.data.data)
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi xảy ra khi thao tác.',
      type: 'error',
    })
  }
}

const getAppliesCVList = async () => {
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
  const res = await UserApi.getAppliedCVEmloyeeList(filter)
  if (res.status == 200 && res.data && res.data.data && res.data.data.data) {
    tableRules.data = await changeData(res.data.data.data)
    tableRules.total = res.data.data.totalElements
  }
}

const changeData = (data) => {
  data.forEach((item) => {
    item.offerSalaryFormat = item.offerSalary
      ? MethodService.formatCurrencyShort(item.offerSalary)
      : 0
    item.timeSubmitFormat = item.timeSubmit
      ? MethodService.formatDate(item.timeSubmit, 'date')
      : ''
  })
  return data
}

const handleAction = (type, rowData) => {
  if (type === 'view') {
    viewCandidateProfile(rowData)
  } else if (type === 'delete') {
    deleteRecruitmentProfile(rowData)
  }
}

const viewCandidateProfile = async (rowData) => {
  try {
    const res = await RecruitmentApi.increaseViewRecruitment(rowData.id)
    if (res.status === 200) {
      // Go to detail
      router.push({
        name: 'Chi tiết hồ sơ ứng viên',
        params: { id: rowData.id },
      })
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi xảy ra khi thao tác.',
      type: 'error',
    })
  }
}

const deleteRecruitmentProfile = async (rowData) => {
  ElMessageBox.confirm('Bạn có chắc muốn xóa hồ sơ này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
    type: 'warning',
  })
    .then(async () => {
      const res = await UserApi.deleteCVFromAppliedCVEmployeeList(rowData.id)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Xóa thành công.',
          type: 'success',
          duration: 3000,
        })
        getAppliesCVList()
      }
    })
    .catch(() => {})
}

onMounted(() => {
  getAppliesCVList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Hồ sơ ứng viên ứng tuyển</h4>
            <div class="d-flex">
              <el-button type="primary" @click="toggleSearchBox">
                <el-icon class="me-2"><Search /></el-icon>
                Ẩn/hiện tìm kiếm
              </el-button>
              <el-button
                type="primary"
                plain
                @click="exportExcel"
                :disabled="tableRules.data.length == 0"
              >
                <el-icon class="me-2"><Download /></el-icon>
                Tải danh sách
              </el-button>
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
                <b-col md="4">
                  <el-form-item label="Lĩnh vực làm việc" prop="">
                    <el-select
                      v-model="formSearchData.value.career"
                      placeholder="Chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in mainJobList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Vị trí ứng tuyển" prop="">
                    <el-input
                      v-model="formSearchData.value.positionOffer"
                      clearable
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Mức lương" prop="">
                    <el-input
                      v-model="formSearchData.value.offerSalary"
                      clearable
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Kinh nghiệm" prop="">
                    <el-select
                      v-model="formSearchData.value.experienceNumber"
                      placeholder="Chọn"
                      clearable
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
                <b-col md="4">
                  <el-form-item label="Địa điểm làm việc" prop="">
                    <el-select
                      v-model="formSearchData.value.workAddress"
                      placeholder="Chọn"
                      clearable
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
                <b-col md="4">
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
        <el-table-column
          prop="userDTO.userInfoDTO.fullName"
          label="Họ và tên"
          min-width="150"
        />
        <el-table-column
          prop="career"
          label="Lĩnh vực ứng tuyển"
          min-width="150"
        />
        <el-table-column
          prop="positionOffer"
          label="Vị trí ứng tuyển"
          min-width="180"
        />
        <el-table-column
          prop="levelDesire"
          label="Cấp bậc mong muốn"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="offerSalaryFormat"
          label="Mức lương"
          min-width="130"
          align="right"
        />
        <el-table-column
          prop="experienceNumber"
          label="Số năm kinh nghiệm"
          min-width="180"
          align="center"
        />
        <el-table-column
          prop="workAddress"
          label="Địa điểm làm việc"
          min-width="140"
        />
        <el-table-column
          prop="workForm"
          label="Hình thức làm việc"
          min-width="180"
        />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="120"
        >
          <template #default="scope">
            <div class="">
              <el-button size="small" @click="handleAction('view', scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button>
              <!-- <el-button
                size="small"
                type="warning"
                plain
                @click="saveRecruitment(scope.row)"
                ><CIcon icon="cilStar"
              /></el-button> -->
              <el-button
                size="small"
                type="danger"
                plain
                @click="handleAction('delete', scope.row)"
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
