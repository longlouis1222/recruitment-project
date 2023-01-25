<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import UserProfileApi from '@/moduleApi/modules/UserProfileApi'

import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployerAccountInfoModel'

const ruleFormRef = ref(FormInstance)
const formData = reactive({ value: MethodService.copyObject(modelData.dataForm)})
const validForm = modelData.validForm
const userProfile = reactive({})

const imageUrl = ref('')

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data = {
        id: userProfile.value.id,
        companyRequest: userProfile.value.companyDTO,
        email: userProfile.value.email,
        password: userProfile.value.password,
        listRole: null,
        type: "EMPLOYEE",
        status: userProfile.value.status ? userProfile.value.status : 1,
        userInfoRequest: {
          address: formData.value.userInfoRequest.address,
          avatar: userProfile.value.userInfoDTO.avatar ? userProfile.value.userInfoDTO.avatar : '',
          companyId: null,
          dateOfBirth: formData.value.userInfoRequest.dateOfBirth,
          fullName: formData.value.userInfoRequest.fullName,
          gender: formData.value.userInfoRequest.gender,
          marriageStatus: formData.value.userInfoRequest.marriageStatus,
          phoneNumber: formData.value.userInfoRequest.phoneNumber,
          town: formData.value.userInfoRequest.town,
        },
        username: userProfile.value.username ? userProfile.value.username : ''
      }
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
      companyDTO: userProfile.value.companyDTO,
      email: userProfile.value.email,
      password: userProfile.value.password,
      listRole: null,
      type: "EMPLOYEE",
      status: userProfile.value.status ? userProfile.value.status : 1,
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
      username: userProfile.value.username ? userProfile.value.username : ''
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
          <h4>Thông tin tài khoản</h4>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="formData.value"
        :rules="validForm"
        label-width="140px"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <h5 class="mb-4">Thông tin đăng nhập</h5>
          <b-col md="7">
            <el-form-item label="Địa chỉ email" prop="email">
              <el-input v-model="formData.value.email" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password">
              <el-input type="password" v-model="formData.value.password" disabled />
            </el-form-item>
          </b-col>
          <b-col md="5">
            <el-form-item label="Ảnh đại diện" prop="">
              <el-upload
                class="avatar-uploader d-flex"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                <template #tip>
                  <div class="el-upload__tip ms-2">
                    Dạng file .jpg, .jpeg, .png <br>
                    dung lượng tối đa là 300KB <br>
                    và kích thước tối thiểu 300x300 pixel.
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Thông tin liên hệ</h5>
          <b-col md="7">
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input v-model="formData.value.userInfoRequest.fullName" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="userInfoRequest.phoneNumber">
              <el-input v-model="formData.value.userInfoRequest.phoneNumber" />
            </el-form-item>
            <el-form-item label="Email liên hệ" prop="email">
              <el-input v-model="formData.value.email" />
            </el-form-item>
            <el-form-item label="Địa chỉ liên hệ" prop="userInfoRequest.address">
              <el-input v-model="formData.value.userInfoRequest.address"  type="textarea"/>
            </el-form-item>
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
  transition: .1s ease;
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
