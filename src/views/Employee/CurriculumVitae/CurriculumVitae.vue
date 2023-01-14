<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import UserProfileApi from '@/moduleApi/modules/UserProfileApi'
import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'

import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
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
const foreignLanguageList = DataService.foreignLanguageList
const proficiencyList = DataService.proficiencyList
const officeSkillList = DataService.officeSkillList

const ruleFormRef = ref(FormInstance)
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm

const imageUrl = ref('')
const userProfile = reactive({ value: [] })

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
    try {
      const recruitmentApiRes = await RecruitmentApi.create(formData.value)
      if (recruitmentApiRes.status == 200) {
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
        message: 'Có lỗi xảy ra.',
        type: 'error',
        duration: 3000,
      })
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const getCVInfo = async () => {
  const recruitmentApiRes = await RecruitmentApi.findById(id)
}

const getUserInfo = async () => {
  const userProfileApiRes = await UserProfileApi.findById(
    localStorage.getItem('uid'),
  )
  if (userProfileApiRes.status == 200) {
    userProfile.value = userProfileApiRes.data.data
    formData.value = { ...formData.value, ...userProfile.value }
  }
}

const getCurrentUserCV = async () => {
  const res = await RecruitmentApi.getCurrentUserCV()
  if (res.status == 200) {
    formData.value = { ...formData.value, ...res.data.data }
  }
}

onMounted(() => {
  getUserInfo()
  getCurrentUserCV()
})
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
        :model="formData.value"
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
              <el-form-item label="Họ và tên" prop="userInfoDTO.fullName">
                <el-input v-model="formData.value.userInfoDTO.fullName" />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Ngày sinh" prop="userInfoDTO.dateOfBirth">
                <el-date-picker
                  v-model="formData.value.userInfoDTO.dateOfBirth"
                  type="date"
                  placeholder="Chọn"
                  format="DD/MM/YYYY"
                />
              </el-form-item>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <el-form-item label="Tỉnh / thành phố" prop="userInfoDTO.town">
                <el-select
                  v-model="formData.value.userInfoDTO.town"
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
            <b-col md="6">
              <el-form-item label="Địa chỉ liên hệ" prop="userInfoDTO.address">
                <el-input
                  v-model="formData.value.userInfoDTO.address"
                  type="text"
                />
              </el-form-item>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <el-form-item label="Giới tính" prop="userInfoDTO.gender">
                <el-radio-group
                  v-model="formData.value.userInfoDTO.gender"
                  class="ml-4"
                >
                  <el-radio :label="0" size="large">Nam</el-radio>
                  <el-radio :label="1" size="large">Nữ</el-radio>
                  <el-radio :label="2" size="large">Khác</el-radio>
                </el-radio-group>
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item
                label="Tình trạng hôn nhân"
                prop="userInfoDTO.marriageStatus"
              >
                <el-radio-group
                  v-model="formData.value.userInfoDTO.marriageStatus"
                  class="ml-4"
                >
                  <el-radio label="single" size="large">Độc thân</el-radio>
                  <el-radio label="marriaged" size="large"
                    >Đã lập gia đình</el-radio
                  >
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
              <el-form-item label="Vị trí mong muốn" prop="positionOffer">
                <el-input
                  v-model="formData.value.positionOffer"
                  placeholder="Vị trí mong muốn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Nghề nghiệp" prop="career">
                <el-select v-model="formData.value.career" placeholder="Chọn">
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

          <b-row>
            <b-col md="6">
              <el-form-item label="Cấp bậc hiện tại" prop="currentLevel">
                <el-select
                  v-model="formData.value.currentLevel"
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
            <b-col md="6">
              <el-form-item label="Cấp bậc mong muốn" prop="levelDesire">
                <el-select
                  v-model="formData.value.levelDesire"
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

          <b-row>
            <b-col md="6">
              <el-form-item label="Mức lương mong muốn" prop="offerSalary">
                <el-input
                  v-model="formData.value.offerSalary"
                  placeholder="9000000"
                />
                <!-- <el-select
                  v-model="formData.value.offerSalary"
                  placeholder="Chọn"
                >
                  <el-option
                    v-for="item in maxSalaryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Trình độ học vấn" prop="academyLevel">
                <el-select
                  v-model="formData.value.academyLevel"
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
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item label="Số năm kinh nghiệm" prop="experienceNumber">
                <el-input
                  v-model="formData.value.experienceNumber"
                  placeholder="2"
                />
                <!-- <el-select
                  v-model="formData.value.experienceNumber"
                  placeholder="Chọn"
                >
                  <el-option
                    v-for="item in experienceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Địa điểm làm việc" prop="workAddress">
                <el-select
                  v-model="formData.value.workAddress"
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
              <el-form-item label="Hình thức làm việc" prop="workForm">
                <el-select v-model="formData.value.workForm" placeholder="Chọn">
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
              <el-form-item label="Mục tiêu nghề nghiệp" prop="careerTarget">
                <el-input
                  v-model="formData.value.careerTarget"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  placeholder="Vị trí công việc, trách nhiệm mà ứng viên có thể đảm nhận khi làm việc ở công ty"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12">
              <el-form-item label="Kỹ năng mềm" prop="sortSkill">
                <el-input
                  v-model="formData.value.sortSkill"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="..."
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
              <el-form-item label="Chức danh" prop="workExperienceDTO.regency">
                <el-input
                  v-model="formData.value.workExperienceDTO.regency"
                  placeholder="Vị trí từng làm việc"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item
                label="Công ty"
                prop="workExperienceDTO.companyName"
              >
                <el-input
                  v-model="formData.value.workExperienceDTO.companyName"
                  placeholder="Công ty A"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item
                label="Thời gian từ"
                prop="workExperienceDTO.fromWorkTime"
              >
                <el-date-picker
                  v-model="formData.value.workExperienceDTO.fromWorkTime"
                  type="date"
                  placeholder="Chọn"
                  format="DD/MM/YYYY"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item
                label="Thời gian tới"
                prop="workExperienceDTO.toWorkTime"
              >
                <el-date-picker
                  v-model="formData.value.workExperienceDTO.toWorkTime"
                  type="date"
                  format="DD/MM/YYYY"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
          </b-row>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item
              label="Mô tả công việc"
              prop="workExperienceDTO.description"
            >
              <el-input
                v-model="formData.value.workExperienceDTO.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
              />
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <h5 class="mb-4">Thông tin học vấn</h5>
          <b-row>
            <b-col md="12">
              <el-form-item
                label="Trường / Trung tâm đào tạo"
                prop="academyInfoDTO.addressAcademy"
              >
                <el-input
                  v-model="formData.value.academyInfoDTO.addressAcademy"
                  placeholder="Trường / Trung tâm đào tạo"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item
                label="Chuyên ngành đào tạo"
                prop="academyInfoDTO.specialize"
              >
                <el-input
                  v-model="formData.value.academyInfoDTO.specialize"
                  placeholder="CNTT"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item
                label="Tên bằng cấp / chứng chỉ"
                prop="academyInfoDTO.certificateName"
              >
                <el-input
                  v-model="formData.value.academyInfoDTO.certificateName"
                  placeholder="Tên bằng cấp / chứng chỉ"
                />
              </el-form-item>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <el-form-item label="Thời gian từ" prop="academyInfoDTO.timeFrom">
                <el-date-picker
                  v-model="formData.value.academyInfoDTO.timeFrom"
                  type="date"
                  format="DD/MM/YYYY"
                  placeholder="Chọn"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Thời gian tới" prop="academyInfoDTO.timeTo">
                <el-date-picker
                  v-model="formData.value.academyInfoDTO.timeTo"
                  type="date"
                  format="DD/MM/YYYY"
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
              <el-form-item
                label="Ngoại ngữ"
                prop="foreignLanguageDTO.foreignLanguageNames"
              >
                <el-select
                  v-model="
                    formData.value.foreignLanguageDTO.foreignLanguageNames
                  "
                  placeholder="Chọn"
                  multiple
                >
                  <el-option
                    v-for="item in foreignLanguageList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item
                label="Mức độ thành thạo"
                prop="foreignLanguageDTO.proficiencies"
              >
                <el-select
                  v-model="formData.value.foreignLanguageDTO.proficiencies"
                  placeholder="Chọn"
                  multiple
                >
                  <el-option
                    v-for="item in proficiencyList"
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

        <b-row>
          <b-col md="12">
            <el-form-item
              label="Mức độ thành thạo"
              prop="officeInfoDTO.officeNames"
            >
              <el-select
                v-model="formData.value.officeInfoDTO.officeNames"
                placeholder="Chọn"
                multiple
                filterable
                allow-create
              >
                <el-option
                  v-for="item in officeSkillList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            </b-col>
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
