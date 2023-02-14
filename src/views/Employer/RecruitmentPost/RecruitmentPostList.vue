<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import IndustryApi from '@/moduleApi/modules/IndustryApi'
import PostApi from '@/moduleApi/modules/PostApi'

import { useRouter } from 'vue-router'
import { ElMessageBox, ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'

import modelData from '../EmployerCompany/EmployerCompanyInfoModel'

const moduleName = 'Danh sách bài tuyển dụng'
const userRole = localStorage.getItem('type')

const router = useRouter()

const rankList = DataService.rankList
const experienceList = DataService.experienceList
const workPlaceList = DataService.workPlaceList
const workFormList = DataService.workFormList

const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const validFormSearch = tableRules.dataSearch.valid

const industryList = reactive({ value: [] })

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

const getPostList = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    // sort: tableRules.sort,
    ...tableRules.filters,
  }
  router.replace({
    name: moduleName,
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const postApiRes = await PostApi.list(filter)
  if (postApiRes.status == 200) {
    tableRules.data = await changeData(postApiRes.data.data.data)
    tableRules.total = postApiRes.data.data.totalElements
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

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        tableRules.skip = 0
        tableRules.page = 1
        await getPostList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleAction = (action, rowData) => {
  if (action === 'approve') {
    approvePost(rowData)
  } else if (action === 'update') {
    updatePost(rowData)
  } else if (action === 'delete') {
    deletePost(rowData)
  }
}

const approvePost = (rowData) => {
  router.push({
    name: 'Duyệt tin tuyển dụng',
    params: { id: rowData.id }
  })
}

const updatePost = (rowData) => {
  router.push({
    name: 'Cập nhật tin tuyển dụng',
    params: { id: rowData.id }
  })
}

const deletePost = async (rowData) => {
  ElMessageBox.confirm(
    'Bạn có chắc muốn xóa bài viết này ?',
    'Cảnh báo',
    {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      type: 'warning',
    },
  )
    .then(async () => {
      const postApiRes = await PostApi.delete(rowData.id)
        if (postApiRes.status === 200) {
          ElNotification({
            title: 'Success',
            message: 'Xóa thành công.',
            type: 'success',
            duration: 3000,
          })
          await getPostList()
        }
    })
    .catch(() => {})
}

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

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
  // getService();
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const getIndustryList = async () => {
  try {
    const industryApiRes = await IndustryApi.list()
    if (industryApiRes.status === 200) {
      industryList.value = industryApiRes.data.data.data
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

onMounted(async () => {
  getIndustryList()
  await getPostList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách bài tuyển dụng</h4>
            <el-button
              type="primary"
              @click="toggleSearchBox"
            >
              <el-icon class="me-2"><Search /></el-icon>
              Ẩn/hiện tìm kiếm
            </el-button>
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

      <el-table :data="tableRules.data" style="width: 100%">
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
        <el-table-column
          prop="status"
          label="Trạng thái"
          align="center"
          min-width="120"
        >
          <template #default="scope">
            <el-tag
              :type="
                scope.row.status === 'APPROVED'
                  ? 'success'
                  : scope.row.status === 'WAITING_APPROVE'
                  ? 'warning'
                  : 'danger'
              "
              disable-transitions
              >{{
                scope.row.status === 'APPROVED'
                  ? 'Đã duyệt'
                  : scope.row.status === 'WAITING_APPROVE'
                  ? 'Chờ duyệt'
                  : 'Từ chối'
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="necessarySkills" label="Khác" min-width="200" />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          :width="userRole === 'ADMIN' ? 170 : 120"
        >
          <template #default="scope">
            <div class="">
              <el-button
                size="small"
                @click="handleAction('approve', scope.row)"
                :disabled="scope.row.status == 'APPROVED' || scope.row.status == 'REJECT'"
                v-if="userRole === 'ADMIN'"
                ><CIcon icon="cilBrushAlt"
              /></el-button>
              <el-button
                size="small"
                type="primary"
                plain
                @click="handleAction('update', scope.row)"
                :disabled="scope.row.status == 'APPROVED' || scope.row.status == 'REJECT'"
                ><CIcon icon="cilPencil"
              /></el-button>
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
</style>
