<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import UserApi from '@/moduleApi/modules/UserApi'
import FileApi from '@/moduleApi/modules/FileApi'

import axios from 'axios'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployerCompanyInfoModel'

const ruleFormRef = ref(FormInstance)
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm

const mainJobList = DataService.mainJobList
const userProfile = reactive({})
const fileList = ref([])
const fileCompanyAvtList = ref([])
const imgSrc = ref('')
const loadingBtnUploadAvt = ref(false)
const loadingBtnBusinessFile = ref(false)

const editor = ClassicEditor
const editorConfig = {
  width: 100,
  height: 200,
  toolbar: {
    items: [
      'bold',
      'italic',
      '|',
      'outdent',
      'indent',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
    ],
    shouldNotGroupWhenFull: true,
  },
}
const editorDisabled = ref(false)

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const data = {
          id: userProfile.value.id,
          email: userProfile.value.email,
          username: userProfile.value.username,
          password: userProfile.value.password,
          listRole: null,
          type: 'EMPLOYER',

          userInfoRequest: userProfile.value.userInfoDTO,
          companyRequest: formData.value.companyRequest,
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
          message: 'Có lỗi khi thao tác.',
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
  try {
    const userProfileApiRes = await UserApi.findById(
      localStorage.getItem('uid'),
    )
    if (userProfileApiRes.status == 200) {
      userProfile.value = userProfileApiRes.data.data
      formData.value = {
        type: 'EMPLOYER',
        userInfoRequest: {
          address: userProfile.value.userInfoDTO.address
            ? userProfile.value.userInfoDTO.address
            : '',
          avatar: userProfile.value.userInfoDTO.avatar
            ? userProfile.value.userInfoDTO.avatar
            : '',
          companyId: userProfile.value.userInfoDTO.companyId
            ? userProfile.value.userInfoDTO.companyId
            : '',
          dateOfBirth: userProfile.value.userInfoDTO.dateOfBirth
            ? userProfile.value.userInfoDTO.dateOfBirth
            : '',
          fullName: userProfile.value.userInfoDTO.fullName
            ? userProfile.value.userInfoDTO.fullName
            : '',
          gender: userProfile.value.userInfoDTO.gender
            ? userProfile.value.userInfoDTO.gender
            : '',
          marriageStatus: userProfile.value.userInfoDTO.marriageStatus
            ? userProfile.value.userInfoDTO.marriageStatus
            : '',
          phoneNumber: userProfile.value.userInfoDTO.phoneNumber
            ? userProfile.value.userInfoDTO.phoneNumber
            : '',
          town: userProfile.value.userInfoDTO.town
            ? userProfile.value.userInfoDTO.town
            : '',
        },
        companyRequest: { ...userProfile.value.companyDTO },
      }
      if (
        !userProfile.value.companyDTO ||
        (userProfile.value.companyDTO && !userProfile.value.companyDTO.fileId)
      )
        return
      if (userProfile.value.userInfoDTO.avatar) {
        const fileApiRes = await FileApi.getFileById(
          userProfile.value.userInfoDTO.avatar,
        )
        if (fileApiRes.status === 200) {
          imgSrc.value = fileApiRes.data.data.thumbnailLink
        }
      }
      await getFileById(userProfile.value.companyDTO.fileId)
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
      duration: 3000,
    })
  }
}

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
  window.open(uploadFile.url)
}

const handleExceed = (files, uploadFiles) => {
  ElNotification({
    title: 'Warning',
    message: `Giới hạn file tải lên là ${files.length}`,
    type: 'warning',
    duration: 3000,
  })
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Bạn có chắc chắn muốn bỏ hồ sơ đính kèm ${uploadFile.name} ?`,
    {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      type: 'warning',
    },
  ).then(
    () => true,
    () => false,
  )
}

const uploadFileToDb = async () => {
  loadingBtnBusinessFile.value = true
  let fd = new FormData()
  fd.append(
    'filePath',
    'https://drive.google.com/drive/folders/1Evc0_Wr5g0ehP9nRPyiSYM_DFXxoHuMm?usp=share_link',
  )
  fd.append('fileUpload', fileList.value[0].raw, fileList.value[0].raw.name)
  fd.append('shared', true)

  axios({
    method: 'post',
    url: 'http://localhost:8085/api/v1/users/company-profile',
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
      //handle success
      loadingBtnBusinessFile.value = false
      console.log('success', response)
      await getFileById(response.data.data)
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
      loadingBtnBusinessFile.value = false
    })
}

const getFileById = async (id) => {
  try {
    const res = await FileApi.getFileById(id)
    if (res.status === 200) {
      fileList.value = [
        {
          name: res.data.data.name,
          url: res.data.data.link,
        },
      ]
    }
  } catch (error) {
    console.log('error:>', error)
    ElNotification({
      title: 'Error',
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
      duration: 3000,
    })
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
          <h4>Thông tin công ty</h4>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="formData.value"
        :rules="validForm"
        label-width="160px"
        label-position="left"
        class="formCompany"
        status-icon
      >
        <b-row>
          <h5 class="mb-4">Thông tin công ty</h5>
          <b-col md="8">
            <el-form-item label="Mã số thuế " prop="companyRequest.taxCode">
              <el-input v-model="formData.value.companyRequest.taxCode" />
            </el-form-item>
            <el-form-item label="Tên công ty" prop="companyRequest.name">
              <el-input v-model="formData.value.companyRequest.name" />
            </el-form-item>
            <el-form-item
              label="Quy mô nhân sự"
              prop="companyRequest.employeeNumber"
            >
              <el-input
                v-model="formData.value.companyRequest.employeeNumber"
              />
            </el-form-item>
            <el-form-item label="Địa điểm" prop="companyRequest.location">
              <el-input v-model="formData.value.companyRequest.location" />
            </el-form-item>
            <el-form-item label="Địa chỉ" prop="companyRequest.companyAddress">
              <el-input
                v-model="formData.value.companyRequest.companyAddress"
              />
            </el-form-item>
            <el-form-item
              label="Điện thoại cố định"
              prop="companyRequest.companyPhoneNumber"
            >
              <el-input
                v-model="formData.value.companyRequest.companyPhoneNumber"
              />
            </el-form-item>
            <el-form-item
              label="Lĩnh vực hoạt động"
              prop="companyRequest.fieldOfActivity"
            >
              <el-select
                v-model="formData.value.companyRequest.fieldOfActivity"
                placeholder="Chọn"
                filterable
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

          <b-col md="4" class="text-center">
            <div class="">
              <img
                :src="
                  imgSrc
                    ? imgSrc
                    : require('@/assets/images/avatars/unknow_avt.png')
                "
                alt="avatar"
                class="avatar__image mb-3"
              />
              <div class="el-upload__tip">
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

          <b-col md="12">
            <el-form-item
              class="businessIntroduction"
              label="Giới thiệu công ty"
              prop="companyRequest.businessIntroduction"
            >
              <!-- <el-input
                type="textarea"
                v-model="formData.value.companyRequest.businessIntroduction"
              /> -->
              <ckeditor
                :editor="editor"
                v-model="formData.value.companyRequest.businessIntroduction"
                :config="editorConfig"
                :disabled="editorDisabled"
                @blur="onEditorBlur(ruleFormRef)"
              ></ckeditor>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Giấy phép kinh doanh</h5>
          <b-col md="12">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action
              multiple
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :auto-upload="false"
              :disabled="loadingBtnBusinessFile"
              accept=".pdf"
            >
              <template #trigger>
                <el-button type="primary"
                  ><el-icon><UploadFilled /></el-icon>Tải lên hồ sơ</el-button
                >
              </template>
              <el-button
                v-if="fileList"
                class="ml-3 mb-2 ms-2 btn-load"
                type="success"
                @click="uploadFileToDb"
                :loading="loadingBtnBusinessFile"
              >
                Cập nhật
              </el-button>
              <template #tip>
                <div class="el-upload__tip">Định dạng file tải lên là PDF.</div>
              </template>
            </el-upload>
          </b-col>
          <b-col md="12">
            <p>Giấy phép kinh doanh hợp lệ</p>
            <p>
              <el-icon color="green"><CircleCheck /></el-icon> Có dấu giáp lai
              của cơ quan có thẩm quyền.
            </p>
            <p>
              <el-icon color="green"><CircleCheck /></el-icon> Trường hợp giấy
              phép kinh doanh là bản photo thì phải có dấu công chứng.
            </p>
          </b-col>
        </b-row>
        <div class="text-center">
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Cập nhật</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.avatar__image {
  width: 150px;
  height: auto;
  border: 1px solid #bebebe;
  border-radius: 8px;
  box-shadow: 0 0 3px 0px #bebebe;
  :hover {
    cursor: pointer;
  }
}
:deep .formCompany {
  .businessIntroduction {
    ul li {
      list-style: initial;
    }
  }
}
</style>
