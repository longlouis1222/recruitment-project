<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './CurriculumVitaeModel'

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
          <h4>Hồ sơ trực tuyến</h4>
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
          <h5 class="mb-4">Thông tin cá nhân</h5>
          <b-col md="6">
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
                    Dạng file .jpg, .jpeg, .png <br />
                    dung lượng tối đa là 300KB <br />
                    và kích thước tối thiểu 300x300 pixel.
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <b-row>
            <b-col md="6">
              <el-form-item label="Họ và tên" prop="fullname">
                <el-input v-model="formData.fullname" />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Ngày sinh" prop="date_of_birth">
                <el-date-picker
                  v-model="formData.date_of_birth"
                  type="date"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <el-form-item label="Tỉnh / thành phố" prop="city">
                <el-select v-model="formData.city" placeholder="Chọn">
                  <el-option
                    v-for="item in workPlaceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Địa chỉ liên hệ" prop="address">
                <el-input v-model="formData.address" type="text" />
              </el-form-item>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <el-form-item label="Giới tính" prop="gender">
                <el-radio-group v-model="formData.gender" class="ml-4">
                  <el-radio label="1" size="large">Nam</el-radio>
                  <el-radio label="2" size="large">Nữ</el-radio>
                  <el-radio label="3" size="large">Khác</el-radio>
                </el-radio-group>
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Tình trạng hôn nhân" prop="marriage">
                <el-radio-group v-model="formData.marriage" class="ml-4">
                  <el-radio label="1" size="large">Độc thân</el-radio>
                  <el-radio label="2" size="large">Đã lập gia đình</el-radio>
                </el-radio-group>
              </el-form-item>
            </b-col>
          </b-row>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Thông tin chung</h5>
          <b-row>
            <b-col md="6">
              <el-form-item label="Vị trí mong muốn" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="Vị trí mong muốn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Cấp bậc hiện tại" prop="password">
                <el-select v-model="formData.city" placeholder="Chọn">
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

          <b-row>
            <b-col md="6">
              <el-form-item label="Cấp bậc mong muốn" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="Cấp bậc mong muốn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Mức lương mong muốn" prop="password">
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
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item label="Cấp bậc mong muốn" prop="email">
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
            <b-col md="6">
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
            <b-col md="6">
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
            <b-col md="6">
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

          <b-row>
            <b-col md="6">
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
            <b-col md="6">
              <el-form-item label="Mục tiêu nghề nghiệp" prop="landline_phone">
                <el-input
                  v-model="formData.landline_phone"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  placeholder="Vị trí công việc, trách nhiệm mà ứng viên có thể đảm nhận khi làm việc ở công ty"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12">
              <el-form-item label="Kỹ năng mềm" prop="landline_phone">
                <el-input
                  v-model="formData.landline_phone"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                />
              </el-form-item>
            </b-col>
          </b-row>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Kinh nghiệm làm việc</h5>
          <b-row>
            <b-col md="6">
              <el-form-item label="Chức danh" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="Vị trí mong muốn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Công ty" prop="email">
                <el-input v-model="formData.email" placeholder="Công ty A" />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item label="Thời gian từ" prop="company_address">
                <el-date-picker
                  v-model="landline_phone"
                  type="date"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Thời gian tới" prop="company_address">
                <el-date-picker
                  v-model="landline_phone"
                  type="date"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
          </b-row>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Thông tin học vấn</h5>
          <b-row>
            <b-col md="12">
              <el-form-item label="Trường / Trung tâm đào tạo" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="Trường / Trung tâm đào tạo"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item label="Chuyên ngành đào tạo" prop="company_address">
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
            <b-col md="6">
              <el-form-item label="Tên bằng cấp / chứng chỉ" prop="email">
                <el-input
                  v-model="formData.email"
                  placeholder="Tên bằng cấp / chứng chỉ"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item label="Thời gian từ" prop="company_address">
                <el-date-picker
                  v-model="landline_phone"
                  type="date"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Thời gian tới" prop="company_address">
                <el-date-picker
                  v-model="landline_phone"
                  type="date"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
          </b-row>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Ngoại ngữ</h5>
          <b-row>
            <b-col md="6">
              <el-form-item label="Noại ngữ" prop="company_address">
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
            <b-col md="6">
              <el-form-item label="Mức độ thành thạo" prop="company_address">
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
          </b-row>
        </b-row>

        <el-divider />

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
