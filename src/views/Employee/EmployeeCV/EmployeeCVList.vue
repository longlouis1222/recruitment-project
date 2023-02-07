<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'
import FileApi from '@/moduleApi/modules/FileApi'
import axios from 'axios'

import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './EmployeeCVModel'

const popoverText = `Bật "Cho phép tìm kiếm" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể chủ động liên hệ với bạn về công việc mới.`

const router = useRouter()

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive(MethodService.copyObject(modelData.dataForm))

const switch1 = ref(false)
const switch2 = ref(false)
const view = ref(0)
const dataCv = reactive({ value: {} })
const currentUserId = localStorage.getItem('uid')

const updateOnlineCV = () => {
  router.push({
    name: 'Hồ sơ trưc tuyến',
    // params:
  })
}

const fileList = ref([])

const uploadFileToDb = async () => {
  let fd = new FormData()
  fd.append('filePath', 'https://drive.google.com/drive/folders/1Evc0_Wr5g0ehP9nRPyiSYM_DFXxoHuMm?usp=share_link')
  fd.append(
    'fileUpload',
    fileList.value[0].raw,
    fileList.value[0].raw.name,
  )
  fd.append('shared', true)

  axios({
    method: 'post',
    url: 'http://localhost:8085/api/v1/recruitments/upload-profile',
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
      console.log('success', response)
      // loadImage.value = true
      await getFileById(response.data.data)
    })
    .catch((response) => {
      //handle error
      console.log('error', response)
    })
}

const getFileById = async (id) => {
  try {
    const res = await FileApi.getFileById(id)
    if (res.status === 200) {
      fileList.value = [
        {
          name: res.data.data.name,
          url: res.data.data.link
        }
      ]
    }
  } catch (error) {
    console.log('error:>', error)
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
  ElMessage.warning(
    `Giới hạn file tải lên là ${files.length}`
  )
}

const beforeRemove = (uploadFile, uploadFiles) => {
  ElMessageBox.confirm(
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

const getCurrentUserCV = async () => {
  const res = await RecruitmentApi.getCurrentUserCV()
  if (res.status == 200) {
    console.log(res.data.data)
    dataCv.value = res.data.data
    switch1.value = dataCv.value.permissionSearch
    switch2.value = dataCv.value.permissionSearch
    view.value = dataCv.value.view
    await getFileById(res.data.data.fileId)
  }
}

const activeSearchUserCV = async () => {
  try {
    const res = await RecruitmentApi.activeSearchUserCV(switch1.value)
    if (res.status == 200) {
      switch2.value = switch1.value
      if (switch1.value) {
        ElNotification({
          title: 'Success',
          message: 'Bật tìm việc cho hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      } else {
        ElNotification({
          title: 'Success',
          message: 'Tắt tìm việc cho hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
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
      message: 'Thay đổi trạng thái tìm việc cho hồ sơ thật bại.',
      type: 'error',
      duration: 3000,
    })
  }
}

onMounted(async () => {
  await getCurrentUserCV()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Hồ sơ ứng viên</h4>
          </div>
        </div>
      </template>

      <h6>Hồ sơ trực tuyến</h6>
      <el-card class="box-card">
        <div class="d-flex align-items-center justify-content-between">
          <img
            src="@/assets/images/icons8-resume-64.png"
            style="width: 64px"
            alt="icons8-resume-64.png"
          />
          <p class="mb-0 ms-2 me-3">{{ dataCv.value.positionOffer ? dataCv.value.positionOffer : 'Vị trí ứng tuyển' }}</p>
          <el-tag :type="'success'" disable-transitions class="ms-2 me-5"
            >Đã duyệt</el-tag
          >
          <el-divider direction="vertical" />
          <p class="mb-0 mx-3">Lượt xem: {{ view }}</p>
          <el-divider direction="vertical" />
          <el-switch v-model="switch1" active-text="Cho phép tìm kiếm" @change="activeSearchUserCV" />
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="popoverText"
            placement="bottom-start"
          >
            <el-icon class="mx-1"><InfoFilled /></el-icon>
          </el-tooltip>
          <el-divider direction="vertical" />
          <el-button
            type="primary"
            class="btn btn-soft-secondary btn-border ms-4"
            @click="updateOnlineCV"
          >
            <CIcon icon="cil-pencil" class="me-2" />
            Cập nhật hồ sơ
          </el-button>
        </div>
      </el-card>

      <h6 class="mt-3">Hồ sơ đính kèm</h6>
      <el-card class="box-card">
        <div class="d-flex align-items-center justify-content-between">
          <img
            src="@/assets/images/PDF-CV.png"
            style="width: 64px"
            alt="PDF-CV.png"
          />
          <p class="mb-0 ms-2 me-3">{{ dataCv.value.positionOffer ? dataCv.value.positionOffer : 'Vị trí ứng tuyển' }}</p>
          <el-tag :type="'success'" disable-transitions class="ms-2 me-5"
            >Đã duyệt</el-tag
          >
          <el-divider direction="vertical" />
          <!-- <p class="mb-0 mx-3">Lượt xem: {{ view }}</p> -->
          <!-- <el-divider direction="vertical" /> -->
          <el-switch v-model="switch2" active-text="Cho phép tìm kiếm" disabled />
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="popoverText"
            placement="bottom-start"
          >
            <el-icon class="mx-1"><InfoFilled /></el-icon>
          </el-tooltip>
          <el-divider direction="vertical" />
          <!-- <el-button
            type="primary"
            class="btn btn-soft-secondary btn-border ms-4"
            @click="updateOnlineCV"
          >
            <CIcon icon="cil-pencil" class="me-2" />
            Cập nhật hồ sơ
          </el-button> -->
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
          >
            <template #trigger>
              <el-button type="primary"><CIcon icon="cil-pencil" class="me-2" />Tải lên hồ sơ</el-button>
            </template>
            <el-button class="ml-3 mb-2 ms-2" type="success" @click="uploadFileToDb">
              Cập nhật
            </el-button>
            <template #tip>
              <div class="el-upload__tip">
                Định dạng file tải lên là PDF.
              </div>
            </template>
          </el-upload>
        </div>
      </el-card>
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
