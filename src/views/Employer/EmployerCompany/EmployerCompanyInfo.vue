<script setup>
import MethodService from '@/service/MethodService'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployerCompanyInfoModel'

const ruleFormRef = ref(FormInstance)
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
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h4>Thông tin công ty</h4>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="validForm"
        label-width="140px"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <h5 class="mb-4">Thông tin công ty</h5>
          <b-col md="7">
            <el-form-item label="Mã số thuế " prop="tax_code">
              <el-input v-model="formData.tax_code" />
            </el-form-item>
            <el-form-item label="Tên công ty" prop="company_name">
              <el-input v-model="formData.company_name" />
            </el-form-item>
            <el-form-item label="Quy mô nhân sự" prop="personnel_size">
              <el-input v-model="formData.personnel_size" />
            </el-form-item>
            <el-form-item label="Địa điểm" prop="location">
              <el-input v-model="formData.location" />
            </el-form-item>
            <el-form-item label="Địa chỉ" prop="company_address">
              <el-input v-model="formData.company_address" />
            </el-form-item>
            <el-form-item label="Điện thoại cố định" prop="landline_phone">
              <el-input v-model="formData.landline_phone" />
            </el-form-item>
            <el-form-item label="Lĩnh vực hoạt động" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                multiple
                placeholder="Select"
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
          <h5 class="mb-4">Giấy phép kinh doanh</h5>
          <b-col md="7">
            <p>Giấy phép kinh doanh hợp lệ</p>
            <p><el-icon color="green"><CircleCheck /></el-icon> Có dấu giáp lai của cơ quan có thẩm quyền.</p>
            <p><el-icon color="green"><CircleCheck /></el-icon> Trường hợp giấy phép kinh doanh là bản photo thì phải có dấu công chứng.</p>
          </b-col>
        </b-row>
        <div>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Cập nhật</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
