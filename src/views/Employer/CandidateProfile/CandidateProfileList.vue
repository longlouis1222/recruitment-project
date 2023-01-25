<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import UserProfileApi from '@/moduleApi/modules/UserProfileApi'

import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './CandidateProfileModel'
import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'

const mainJobList = DataService.mainJobList
const experienceList = DataService.experienceList
const workPlaceList = DataService.workPlaceList
const workFormList = DataService.workFormList

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formSearchData = reactive({value: MethodService.copyObject(modelData.dataForm)})

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
        await getRecruitmentList()
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
  // getService();
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const getRecruitmentSavedList = async () => {
  const res = await RecruitmentApi.getRecruitmentSavedList()
  if (res.status == 200) {
    tableRules.data = changeData(res.data.data)
  }
}

const changeData = (data) => {
  data.forEach((item) => {
    item.offerSalaryFormat = item.offerSalary
      ? MethodService.formatCurrency(item.offerSalary) + ' VND'
      : 0
    item.timeSubmitFormat = item.timeSubmit ? MethodService.formatDate(item.timeSubmit, 'date') : ''
  })
  return data
}

onMounted(() => {
  getRecruitmentSavedList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Hồ sơ ứng viên</h4>
            <el-button
              type="primary"
              class="btn btn-soft-secondary btn-border"
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
          prop="timeSubmitFormat"
          label="Thời gian nộp"
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
          width="180"
        >
          <template #default="scope">
            <div class="">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button>
              <el-button
                size="small"
                type="warning"
                plain
                @click="saveRecruitment(scope.row)"
                ><CIcon icon="cilStar"
              /></el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="deletePost(scope.row)"
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
