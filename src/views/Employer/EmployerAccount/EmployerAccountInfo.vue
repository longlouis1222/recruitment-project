<script setup>
import MethodService from '@/service/MethodService'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployerAccountInfoModel'

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const formData = reactive(MethodService.copyObject(modelData.dataForm))

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
          <h4>Thông tin tài khoản</h4>
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
          <h5 class="mb-4">Thông tin đăng nhập</h5>
          <b-col md="7">
            <el-form-item label="Địa chỉ email" prop="email">
              <el-input v-model="formData.email" />
            </el-form-item>
            <el-form-item label="Mật khẩu" prop="password">
              <el-input v-model="formData.password" />
            </el-form-item>
          </b-col>
          <b-col md="5">
            <el-form-item label="Ảnh đại diện" prop="avatar">
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
            <el-form-item label="Họ và tên" prop="fullname">
              <el-input v-model="formData.fullname" />
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="phone_number">
              <el-input v-model="formData.phone_number" />
            </el-form-item>
            <el-form-item label="Email liên hệ" prop="contact_email">
              <el-input v-model="formData.contact_email" />
            </el-form-item>
            <el-form-item label="Địa chỉ liên hệ" prop="address">
              <el-input v-model="formData.address"  type="textarea"/>
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
  transition: .1s ease;
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
