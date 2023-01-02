<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import UserProfileApi from '@/moduleApi/modules/UserProfileApi'

import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployerCompanyInfoModel'

const ruleFormRef = ref(FormInstance)
const formData = reactive({ value: MethodService.copyObject(modelData.dataForm)})
const validForm = modelData.validForm

const mainJobList = DataService.mainJobList
const userProfile = reactive({})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data = {
        id: userProfile.value.id,
        email: userProfile.value.email,
        password: userProfile.value.password,
        listRole: null,
        type: "EMPLOYER",

        userInfoRequest: userProfile.value.userInfoDTO,
        // userInfoRequest: {
        //   ...userProfile.value.userInfoDTO
        // },
        companyRequest: formData.value.companyRequest,
      }
      console.log('data', data)
      const userProfileApiRes = await UserProfileApi.update(data)
      if (userProfileApiRes.status == 200) {
        ElNotification({
          title: 'Success',
          message: 'Cập nhật thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    } else {
      console.log('error submit!', fields)
      return
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const getUserInfo = async () => {
  const userProfileApiRes = await UserProfileApi.findById(localStorage.getItem('uid'))
  if (userProfileApiRes.status == 200) {
    userProfile.value = userProfileApiRes.data.data
    formData.value = {
      type: "EMPLOYER",
      userInfoRequest: {
        address: userProfile.value.userInfoDTO.address,
        avatar: null,
        companyId: null,
        dateOfBirth: userProfile.value.userInfoDTO.dateOfBirth,
        fullName: userProfile.value.userInfoDTO.fullName,
        gender: userProfile.value.userInfoDTO.gender,
        marriageStatus: userProfile.value.userInfoDTO.marriageStatus,
        phoneNumber: userProfile.value.userInfoDTO.phoneNumber,
        town: userProfile.value.userInfoDTO.town,
      },
      // companyRequest: userProfile.value.companyDTO,
      companyRequest: { ...userProfile.value.companyDTO }
    }
    console.log("userProfile", userProfile)
  }
}

onMounted(() => {
  getUserInfo()
})
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
        :model="formData.value"
        :rules="validForm"
        label-width="160px"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <h5 class="mb-4">Thông tin công ty</h5>
          <b-col md="7">
            <el-form-item label="Mã số thuế " prop="companyRequest.taxCode">
              <el-input v-model="formData.value.companyRequest.taxCode" />
            </el-form-item>
            <el-form-item label="Tên công ty" prop="companyRequest.name">
              <el-input v-model="formData.value.companyRequest.name" />
            </el-form-item>
            <el-form-item label="Quy mô nhân sự" prop="companyRequest.employeeNumber">
              <el-input v-model="formData.value.companyRequest.employeeNumber" />
            </el-form-item>
            <el-form-item label="Địa điểm" prop="companyRequest.location">
              <el-input v-model="formData.value.companyRequest.location" />
            </el-form-item>
            <el-form-item label="Địa chỉ" prop="companyRequest.companyAddress">
              <el-input v-model="formData.value.companyRequest.companyAddress" />
            </el-form-item>
            <el-form-item label="Điện thoại cố định" prop="companyRequest.companyPhoneNumber">
              <el-input v-model="formData.value.companyRequest.companyPhoneNumber" />
            </el-form-item>
            <el-form-item label="Lĩnh vực hoạt động" prop="companyRequest.fieldOfActivity">
              <el-select
                v-model="formData.value.companyRequest.fieldOfActivity"
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
