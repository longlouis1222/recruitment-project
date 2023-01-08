<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from '../EmployerCompany/EmployerCompanyInfoModel'

const workFormList = DataService.workFormList
const certificateList = DataService.certificateList
const experienceList = DataService.experienceList
const rankList = DataService.rankList
const ageRequirementList = DataService.ageRequirementList
const genderRequirementList = DataService.genderRequirementList
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList
const minSalaryList = DataService.minSalaryList
const maxSalaryList = DataService.minSalaryList

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive(MethodService.copyObject(modelData.dataForm))
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

const tableData = [
  {
    name: 'Tin tức 24h',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
]

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
  tableRules.limit = limit;
  fn_tableChangeOffset(1);
};
const fn_tableCurentChange = (page) => {
  fn_tableChangeOffset(page);
};
const fn_tablePrevClick = () => {
  // fn_tableChangeOffset(page);
};
const fn_tableNextClick = () => {
  // fn_tableChangeOffset(page);
};
const fn_tableChangeOffset = (page) => {
  tableRules.page = page;
  tableRules.offset = (tableRules.page - 1) * tableRules.limit;
  // getService();
};
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules;
  MethodService.tableSortChange(column, tableSort);
  // getService();
};

onMounted(() => {
  tableRules.total = tableData.length;
  // console.log('tableRules.showFormSearch', tableRules.showFormSearch)
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

      <el-table :data="tableData">
        <el-table-column prop="name" label="Tên tin đăng" min-width="180" />
        <el-table-column
          prop="date_post"
          label="Ngày đăng"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="end_date"
          label="Thời hạn nộp"
          min-width="100"
          align="center"
        />
        <el-table-column prop="approve_time" label="Lượt nộp" align="center" />
        <el-table-column prop="read_time" label="Lượt xem" align="center" />
        <el-table-column
          prop="post_status"
          label="Tình trạng tin"
          min-width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column prop="status" label="Trạng thái" align="center" />
        <el-table-column prop="others" label="Khác" />
      </el-table>
      <div class="mt-3 mb-3" style="float: right">
        <el-pagination
          small
          v-model:currentPage="tableRules.page"
          v-model:pageSize="tableRules.limit"
          :page-sizes="tableRules.lengthMenu"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableRules.total"
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
