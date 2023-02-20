<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import UserApi from '@/moduleApi/modules/UserApi'
import FileApi from '@/moduleApi/modules/FileApi'
import axios from 'axios'

import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployerAccountInfoModel'

const ruleFormRef = ref(FormInstance)
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm
const userProfile = reactive({})

const imageUrl = ref('')
const loadingBtnUploadAvt = ref(false)
const fileCompanyAvtList = ref([])
const imgSrc = ref('')

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
      try {
        const data = {
          id: userProfile.value.id,
          companyRequest: userProfile.value.companyDTO,
          email: userProfile.value.email,
          password: userProfile.value.password,
          listRole: null,
          type: 'EMPLOYEE',
          status: userProfile.value.status ? userProfile.value.status : 1,
          userInfoRequest: {
            address: formData.value.userInfoRequest.address,
            avatar: userProfile.value.userInfoDTO.avatar
              ? userProfile.value.userInfoDTO.avatar
              : '',
            companyId: null,
            dateOfBirth: formData.value.userInfoRequest.dateOfBirth,
            fullName: formData.value.userInfoRequest.fullName,
            gender: formData.value.userInfoRequest.gender,
            marriageStatus: formData.value.userInfoRequest.marriageStatus,
            phoneNumber: formData.value.userInfoRequest.phoneNumber,
            town: formData.value.userInfoRequest.town,
          },
          username: userProfile.value.username
            ? userProfile.value.username
            : '',
        }
        const userProfileApiRes = await UserApi.update(data)
        if (userProfileApiRes.status == 200) {
          ElNotification({
            title: 'Success',
            message: 'Cập nhật thành công.',
            type: 'success',
            duration: 3000,
          })
        }
      } catch (error) {
        ElNotification({
          title: 'Error',
          message: 'Cập nhật thất bại.',
          type: 'error',
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
  const userProfileApiRes = await UserApi.findById(localStorage.getItem('uid'))
  if (userProfileApiRes.status == 200) {
    userProfile.value = userProfileApiRes.data.data
    formData.value = {
      companyDTO: userProfile.value.companyDTO,
      email: userProfile.value.email,
      password: userProfile.value.password,
      listRole: null,
      type: 'EMPLOYEE',
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
      username: userProfile.value.username ? userProfile.value.username : '',
    }

    if (userProfile.value.userInfoDTO.avatar) {
        const fileApiRes = await FileApi.getFileById(
          userProfile.value.userInfoDTO.avatar,
        )
        if (fileApiRes.status === 200) {
          imgSrc.value = fileApiRes.data.data.thumbnailLink
        }
      }
  }
}

const uploadAvatar = async () => {
  loadingBtnUploadAvt.value = true

  let fd = new FormData()
  fd.append(
    'filePath',
    'https://drive.google.com/drive/folders/1Evc0_Wr5g0ehP9nRPyiSYM_DFXxoHuMm?usp=share_link',
  )
  fd.append(
    'fileUpload',
    formData.value.avatar[0].raw,
    formData.value.avatar[0].raw.name,
  )
  fd.append('shared', true)

  axios({
    method: 'post',
    url: 'http://localhost:8085/api/v1/users/avatar',
    // url: 'http://localhost:8085/api/v1/users/company-profile-local',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        localStorage.getItem('Token') && localStorage.getItem('uid')
          ? 'Bearer ' + localStorage.getItem('Token')
          : '',
    },
  })
    .then(async (response) => {
      const userProfileApiRes = await UserApi.findById(
        localStorage.getItem('uid'),
      )
      if (userProfileApiRes.status == 200) {
        const res = userProfileApiRes.data.data
        const fileApiRes = await FileApi.getFileById(res.userInfoDTO.avatar)
        if (fileApiRes.status === 200) {
          imgSrc.value = fileApiRes.data.data.thumbnailLink
        }
      }
      formData.value.avatar = []
      ElNotification({
        title: 'Success',
        message: 'Cập nhật thành công.',
        type: 'success',
        duration: 3000,
      })
      formData.value.avatar = []

      loadingBtnUploadAvt.value = false
    })
    .catch((response) => {
      //handle error
      console.log('error', response)
      ElNotification({
        title: 'Error',
        message: 'Có lỗi khi upload file.',
        type: 'error',
        duration: 3000,
      })
      loadingBtnUploadAvt.value = false
    })
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
              <el-input
                type="password"
                v-model="formData.value.password"
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4" class="text-center">
            <div class="d-flex justify-content-center align-items-center">
              <img
                :src="
                  imgSrc
                    ? imgSrc
                    : require('@/assets/images/avatars/unknow_avt.png')
                "
                alt="avatar"
                class="avatar__image mb-3"
              />
              <div class="el-upload__tip ms-3">
                Dạng file .jpg, .jpeg, .png <br />
                dung lượng tối đa là 300KB <br />
                và kích thước tối thiểu 300x300 pixel.
              </div>
            </div>
            <div class="">
              <el-upload
                v-model:file-list="formData.value.avatar"
                action
                limit="1"
                accept=".jpg,.jpeg,.png"
                :auto-upload="false"
                :before-upload="beforeAvatarUpload"
                :disabled="loadingBtnUploadAvt"
              >
                <template #trigger>
                  <el-button type="primary" class="mt-3"
                    ><CIcon icon="cil-pencil" class="me-2" />Cập nhật đại
                    diện</el-button
                  >
                </template>
                <el-button
                  v-if="
                    formData.value.avatar && formData.value.avatar.length > 0
                  "
                  class="ml-3 mb-2 ms-2"
                  type="success"
                  @click="uploadAvatar"
                  :loading="loadingBtnUploadAvt"
                >
                  Lưu
                </el-button>
              </el-upload>
            </div>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Thông tin liên hệ</h5>
          <b-col md="7">
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input v-model="formData.value.userInfoRequest.fullName" />
            </el-form-item>
            <el-form-item
              label="Số điện thoại"
              prop="userInfoRequest.phoneNumber"
            >
              <el-input v-model="formData.value.userInfoRequest.phoneNumber" />
            </el-form-item>
            <el-form-item label="Email liên hệ" prop="email">
              <el-input v-model="formData.value.email" />
            </el-form-item>
            <el-form-item
              label="Địa chỉ liên hệ"
              prop="userInfoRequest.address"
            >
              <el-input
                v-model="formData.value.userInfoRequest.address"
                type="textarea"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <div class="text-center">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
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
.avatar__image {
  width: 80px;
  height: auto;
  border: 1px solid #bebebe;
  border-radius: 8px;
  box-shadow: 0 0 3px 0px #bebebe;
  :hover {
    cursor: pointer;
  }
}
</style>
