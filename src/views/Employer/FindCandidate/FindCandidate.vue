<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'
import UserProfileApi from '@/moduleApi/modules/UserProfileApi'

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

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const userProfile = reactive({ value: {}})

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
  data.forEach(item => {
    item.offerSalaryFormat = item.offerSalary ? MethodService.formatCurrency(item.offerSalary) + " VND" : 0
  })
  return data
}

const getUserInfo = async () => {
  if (!localStorage.getItem('uid')) return;
  const userProfileApiRes = await UserProfileApi.findById(
    localStorage.getItem('uid'),
  )
  if (userProfileApiRes.status == 200) {
    userProfile.value = userProfileApiRes.data.data
  }
}

const saveRecruitment = async (rowData) => {
  try {
    const res = await RecruitmentApi.saveList([...userProfile.value.userInfoDTO.arrProfileIds, rowData.id])
    if (res.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'Lưu hồ sơ thành công.',
        type: 'success',
        duration: 3000,
      })
    }
  } catch (error) {
    if (error.error_code === 404) {
      ElNotification({
        title: 'Error',
        message: `${error.errorMessage}.`,
        type: 'error',
        duration: 3000,
      })
      return;
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
              :model="formData"
              :rules="validForm"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
            >
              <b-row>
                <b-col md="3">
                  <el-form-item label="Hình thức làm việc" prop="">
                    <el-select
                      v-model="formData.field_of_acitvity"
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
                <b-col md="3">
                  <el-form-item label="Địa điểm" prop="">
                    <el-select
                      v-model="formData.field_of_acitvity"
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
                <b-col md="3">
                  <el-form-item label="Bằng cấp" prop="">
                    <el-select
                      v-model="formData.field_of_acitvity"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in certificateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Kinh nghiệm" prop="">
                    <el-select
                      v-model="formData.field_of_acitvity"
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
              </b-row>

              <b-row>
                <b-col md="3">
                  <el-form-item label="Mức lương" prop="">
                    <el-select
                      v-model="formData.field_of_acitvity"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in minSalaryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Giới tính" prop="">
                    <el-select
                      v-model="formData.field_of_acitvity"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in genderRequirementList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Ngoại ngữ" prop="email">
                    <el-select
                      v-model="formData.field_of_acitvity"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in genderRequirementList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Loại hồ sơ" prop="email">
                    <el-select
                      v-model="formData.field_of_acitvity"
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
              </b-row>

              <div class="text-center">
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                  >Tìm kiếm</el-button
                >
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableRules.data">
        <el-table-column prop="name" label="Họ và tên" min-width="150" />
        <el-table-column
          prop="career"
          label="Lĩnh vực ứng tuyển"
          min-width="130"
        />
        <el-table-column
          prop="positionOffer"
          label="Vị trí ứng tuyển"
          min-width="180"
        />
        <el-table-column
          prop="offerSalaryFormat"
          label="Mức lương"
          min-width="180"
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
          min-width="130"
        />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="140"
        >
          <template #default="scope">
            <div class="">
              <!-- <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button> -->
              <el-button
                size="small"
                type="warning"
                plain
                @click="saveRecruitment(scope.row)"
                ><CIcon icon="cilStar"
              /></el-button>
              <!-- <el-button
                size="small"
                type="danger"
                plain
                @click="deletePost(scope.row)"
                ><CIcon icon="cilTrash"
              /></el-button> -->
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
::v-deep .avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.1s ease;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>
