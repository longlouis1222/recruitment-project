<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import { ElNotification } from 'element-plus'
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

const switch1 = ref(true)
const switch2 = ref(false)

const updateOnlineCV = () => {
  router.push({
    name: 'Hồ sơ ứng viên',
    // params:
  })
}

onMounted(() => {})
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
          <p class="mb-0 ms-2 me-3">Thực Tập Sinh IT Phần Mềm</p>
          <el-tag :type="'success'" disable-transitions class="ms-2 me-5"
            >Đã duyệt</el-tag
          >
          <el-divider direction="vertical" />
          <p class="mb-0 mx-3">Lượt xem: 11</p>
          <el-divider direction="vertical" />
          <el-switch v-model="switch1" active-text="Cho phép tìm kiếm" />
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
          <p class="mb-0 ms-2 me-3">Thực Tập Sinh IT Phần Mềm</p>
          <el-tag :type="'success'" disable-transitions class="ms-2 me-5"
            >Đã duyệt</el-tag
          >
          <el-divider direction="vertical" />
          <p class="mb-0 mx-3">Lượt xem: 2</p>
          <el-divider direction="vertical" />
          <el-switch v-model="switch2" active-text="Cho phép tìm kiếm" />
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
