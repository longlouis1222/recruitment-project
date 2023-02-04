<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'
import UserApi from '@/moduleApi/modules/UserApi'

import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './FindCandidateModel'

const moduleName = 'Tìm ứng viên'
const router = useRouter()

const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm
const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const validSearchForm = tableRules.dataSearch.valid

const mainJobList = DataService.mainJobList
const experienceList = DataService.experienceList
const workPlaceList = DataService.workPlaceList
const workFormList = DataService.workFormList

const userProfile = reactive({ value: {} })

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

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        tableRules.skip = 0
        tableRules.page = 1
        await getRecruitmentList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
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
  tableRules.skip = (tableRules.page - 1) * tableRules.limit
  // getService();
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const backToPrev = () => {
  router.go(-1)
}

const getRecruitmentList = async () => {
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
  const recruitmentApiRes = await RecruitmentApi.list(filter)
  if (recruitmentApiRes.status == 200) {
    tableRules.data = await changeData(recruitmentApiRes.data.data.data)
    tableRules.total = recruitmentApiRes.data.data.totalElements
  }
}

const changeData = (data) => {
  data.forEach((item) => {
    item.offerSalaryFormat = item.offerSalary
      ? MethodService.formatCurrency(item.offerSalary) + ' VND'
      : 0
    const isSavedProfile = (userProfile.value.userInfoDTO.arrProfileIds || []).findIndex(o => o === item.id)
    item.isSaved = isSavedProfile < 0 ? false : true
  })
  return data
}

const getUserInfo = async () => {
  if (!localStorage.getItem('uid')) return
  const userProfileApiRes = await UserApi.findById(
    localStorage.getItem('uid'),
  )
  if (userProfileApiRes.status == 200) {
    userProfile.value = userProfileApiRes.data.data
    console.log(userProfile.value.userInfoDTO)
  }
}

const handleAction = (action, rowData) => {
  if (action === 'view') {
    viewCandidateProfile(rowData)
  } else if (action === 'save') {
    saveRecruitment(rowData)
  }
}

const viewCandidateProfile = async (rowData) => {
  const res = await RecruitmentApi.increaseViewRecruitment(rowData.id)
  if (res.status === 200) {
    // Go to detail
    router.push({
      name: 'Chi tiết hồ sơ ứng viên',
      params: { id: rowData.id }
    })
  }
}

const saveRecruitment = async (rowData) => {
  try {
    let dataBody = {
      profileIds: []
    }
    let arrSave = []
    console.log('rowData.id:>', rowData.id)
    console.log('userProfile.value:>', userProfile.value)
    if (
      userProfile.value &&
      userProfile.value.userInfoDTO &&
      (!userProfile.value.userInfoDTO.arrProfileIds ||
        userProfile.value.userInfoDTO.arrProfileIds.length === 0)
    ) {
      dataBody.profileIds = [rowData.id]
      const res = await RecruitmentApi.saveList(dataBody)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Lưu hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    } else if (
      userProfile.value &&
      userProfile.value.userInfoDTO &&
      userProfile.value.userInfoDTO.arrProfileIds &&
      userProfile.value.userInfoDTO.arrProfileIds.length > 0 &&
      userProfile.value.userInfoDTO.arrProfileIds.includes(rowData.id)
    ) {
      arrSave = userProfile.value.userInfoDTO.arrProfileIds.filter(
        (item) => item != rowData.id,
      )
      console.log('arrSave:>', arrSave)
      dataBody.profileIds = arrSave
      const res = await RecruitmentApi.saveList(dataBody)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Bỏ lưu hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    } else {
      arrSave = [...userProfile.value.userInfoDTO.arrProfileIds, rowData.id]
      const res = await RecruitmentApi.saveList(arrSave)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Lưu hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    }
    await getUserInfo()
    await getRecruitmentList()
  } catch (error) {
    console.log(error)
    if (error.error_code === 404) {
      ElNotification({
        title: 'Error',
        message: `${error.errorMessage}.`,
        type: 'error',
        duration: 3000,
      })
      return
    }
    ElNotification({
      title: 'Error',
      message: 'Lưu hồ sơ thất bại.',
      type: 'error',
      duration: 3000,
    })
  }
}

onMounted(() => {
  getUserInfo()
  getRecruitmentList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Tìm ứng viên</h4>
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
                <b-col md="4">
                  <el-form-item label="Lĩnh vực làm việc" prop="">
                    <el-select
                      v-model="formSearchData.value.career"
                      placeholder="Chọn"
                      clearable
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
          width="140"
        >
          <template #default="scope">
            <div class="">
              <el-button
                size="small"
                @click="handleAction('view', scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button>
              <el-button
                size="small"
                type="warning"
                plain
                @click="handleAction('save', scope.row)"
                :disabled="scope.row.isSaved"
                ><CIcon icon="cilStar"
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
