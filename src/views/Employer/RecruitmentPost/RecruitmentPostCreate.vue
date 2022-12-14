<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './RecruitmentPostModel'

const ruleFormRef = ref(FormInstance)

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

const validForm = modelData.validForm
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

onMounted(() => {
  console.log('workFormList', workFormList)
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h4>Tạo tin tuyển dụng</h4>
        </div>
      </template>
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
          <b-col md="12">
            <el-form-item label="Chức danh" prop="tax_code">
              <el-input
                v-model="formData.tax_code"
                placeholder="Vị trí hiển thị đăng tuyển"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Hình thức làm việc" prop="company_name">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
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
          <b-col md="4">
            <el-form-item label="Bằng cấp" prop="company_name">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
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
          <b-col md="4">
            <el-form-item label="Kinh nghiệm" prop="personnel_size">
              <el-select
                v-model="formData.field_of_acitvity"
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
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Cấp bậc" prop="location">
              <el-select
                v-model="formData.field_of_acitvity"
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
          <b-col md="4">
            <el-form-item label="Yêu cầu độ tuổi" prop="company_address">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in ageRequirementList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Yêu cầu giới tính" prop="landline_phone">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
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
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Số lượng tuyển" prop="location">
              <el-input
                v-model="formData.location"
                placeholder="Vui lòng nhập"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Thời gian thử việc" prop="company_address">
              <el-input
                v-model="formData.company_address"
                placeholder="Vui lòng nhập"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Hạn nộp hồ sơ" prop="landline_phone">
              <el-date-picker
                v-model="landline_phone"
                type="date"
                placeholder="Chọn"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Ngành nghề chính" prop="location">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
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
            <el-form-item label="Ngành nghề phụ" prop="company_address">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in secondJobList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Nơi làm việc" prop="landline_phone">
              <el-select
                v-model="formData.field_of_acitvity"
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
        </b-row>

        <el-divider />

        <b-row>
          <b-col md="6">
            <el-form-item label="Mức lương tối thiểu" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
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
          <b-col md="6">
            <el-form-item label="Mức lương tối đa" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in maxSalaryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Kỹ năng cần thiết" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                multiple
                placeholder="Nhập các kỹ năng cần thiết cho vị trí này"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <b-col md="12">
            <el-form-item label="Mô tả công việc" prop="landline_phone">
              <el-input
                v-model="formData.landline_phone"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="Thông tin cho vị trí công việc yêu cầu, trách nhiệm mà ứng viên có thể đảm nhận khi làm việc ở công ty"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Yêu cầu công việc" prop="landline_phone">
              <el-input
                v-model="formData.landline_phone"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="Kỹ năng chuyên môn hoặc kỹ năng mềm cần thiết với công việc mà ứng viên cần quan tâm"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Quyền lợi" prop="landline_phone">
              <el-input
                v-model="formData.landline_phone"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="Những quyền lợi, lợi ích với công việc cho ứng viên với vị trí đăng tuyển"
              />
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <h5>Thông tin người liên hệ</h5>
          <b-col md="4">
            <el-form-item label="Họ và tên" prop="company_name">
              <el-input v-model="formData.company_name" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Email" prop="company_name">
              <el-input v-model="formData.company_name" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Điện thoại" prop="personnel_size">
              <el-input v-model="formData.personnel_size" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Địa chỉ liên hệ" prop="landline_phone">
              <el-input
                v-model="formData.landline_phone"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
              />
            </el-form-item>
          </b-col>
        </b-row>

        <div class="text-right">
          <el-button @click="submitForm(ruleFormRef)">Hủy bỏ</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Tiếp tục</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
