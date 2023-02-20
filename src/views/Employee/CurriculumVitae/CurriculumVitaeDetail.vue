<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import UserApi from '@/moduleApi/modules/UserApi'
import RecruitmentApi from '@/moduleApi/modules/RecruitmentApi'
import IndustryApi from '@/moduleApi/modules/IndustryApi'
import FileApi from '@/moduleApi/modules/FileApi'

import { ElNotification, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import modelData from './CurriculumVitaeModel'

const route = useRoute()
const router = useRouter()

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
const industryList = reactive({ value: [] })

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
const editorConfigSortSkill = {
  ...editorConfig,
  placeholder:
    'Thông tin cho kỹ năng công việc yêu cầu mà ứng viên cần khi làm việc ở công ty.',
}
const editorConfigDescription = {
  ...editorConfig,
  placeholder:
    'Mô tả kỹ năng, công việc mà ứng viên cần khi làm việc ở công ty.',
}

const editorDisabled = ref(true)

const onEditorBlur = (formEl) => {
  if (!formData.value.jobDescription) {
    // formEl.validate(async (valid, fields) => {
    //   if (valid) return
    //   else console.log('error submit!', fields)
    // })
    // formEl.validate('jobDescription')
  }
}

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

const backToPrev = () => {
  router.go(-1)
}

const getCVById = async () => {
  try {
    const res = await RecruitmentApi.findById(route.params.id)
    if (res.status == 200) {
      formData.value = { ...res.data.data }

      if (formData.value.userDTO && formData.value.userDTO.userInfoDTO && formData.value.userDTO.userInfoDTO.avatar) {
        console.log(formData.value.userDTO.userInfoDTO.avatar)
        const fileApiRes = await FileApi.getFileById(formData.value.userDTO.userInfoDTO.avatar)
        if (fileApiRes.status === 200) {
          formData.value.avt = fileApiRes.data.data.thumbnailLink
        }
      }

      formData.value.isSaved =
        (userProfile.value.userInfoDTO.arrProfileIds || []).findIndex(
          (o) => o == route.params.id,
        ) < 0
          ? false
          : true
    }
  } catch (error) {
    console.log(error)
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const getUserInfo = async () => {
  try {
    if (!localStorage.getItem('uid')) return
    const userProfileApiRes = await UserApi.findById(
      localStorage.getItem('uid'),
    )
    if (userProfileApiRes.status == 200) {
      userProfile.value = userProfileApiRes.data.data
    }
  } catch (error) {
    console.log(error)
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const saveRecruitment = async () => {
  try {
    let dataBody = {
      profileIds: [],
    }
    let arrSave = []
    if (
      userProfile.value &&
      userProfile.value.userInfoDTO &&
      (!userProfile.value.userInfoDTO.arrProfileIds ||
        userProfile.value.userInfoDTO.arrProfileIds.length === 0)
    ) {
      dataBody.profileIds = [parseInt(route.params.id)]
      const res = await RecruitmentApi.saveList(dataBody)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Lưu hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    } else if (
      userProfile.value &&
      userProfile.value.userInfoDTO &&
      userProfile.value.userInfoDTO.arrProfileIds &&
      userProfile.value.userInfoDTO.arrProfileIds.length > 0 &&
      userProfile.value.userInfoDTO.arrProfileIds.includes(
        parseInt(route.params.id),
      )
    ) {
      arrSave = userProfile.value.userInfoDTO.arrProfileIds.filter(
        (item) => item != parseInt(route.params.id),
      )
      dataBody.profileIds = arrSave
      const res = await RecruitmentApi.saveList(dataBody)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Bỏ lưu hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    } else {
      arrSave = [
        ...userProfile.value.userInfoDTO.arrProfileIds,
        parseInt(route.params.id),
      ]
      dataBody.profileIds = arrSave
      const res = await RecruitmentApi.saveList(dataBody)
      if (res.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Lưu hồ sơ thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    }
    await getUserInfo()
    await getCVById()
  } catch (error) {
    console.log(error)
    if (error.error_code === 404) {
      ElNotification({
        title: 'Error',
        message: `${error.errorMessage}.`,
        type: 'error',
        duration: 3000,
      })
      return
    }
    ElNotification({
      title: 'Error',
      message: 'Lưu hồ sơ thất bại.',
      type: 'error',
      duration: 3000,
    })
  }
}

const getIndustryList = async () => {
  try {
    const res = await IndustryApi.list('size=99999')
    if (res.status === 200) {
      industryList.value = res.data.data.data
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Có lỗi xảy ra khi tải dữ liệu.',
      type: 'error',
      duration: 3000,
    })
  }
}

onMounted(async () => {
  await getUserInfo()
  await getCVById()
  await getIndustryList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h4>
            Hồ sơ ứng viên
            <span class="text-info">{{
              formData.value.userDTO &&
              formData.value.userDTO.userInfoDTO &&
              formData.value.userDTO.userInfoDTO.fullName
                ? formData.value.userDTO.userInfoDTO.fullName
                : 'A'
            }}</span>
          </h4>
          <el-button type="primary" plain @click="backToPrev"
            >Quay lại</el-button
          >
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
        disabled
      >
        <b-row>
          <h5 class="mb-4">Thông tin cá nhân</h5>
          <b-col md="6">
            <img
              :src="formData.value.avt ? formData.value.avt : require('@/assets/images/avatars/unknow_avt.png')"
              alt="employee-avt.png"
              class="card__logo"
            />
          </b-col>
        </b-row>

        <el-divider />

        <b-row
          v-if="formData.value.userDTO && formData.value.userDTO.userInfoDTO"
        >
          <b-row>
            <b-col md="6">
              <el-form-item label="Họ và tên" prop="userInfoDTO.fullName">
                <el-input
                  v-model="formData.value.userDTO.userInfoDTO.fullName"
                />
              </el-form-item>
            </b-col>
            <b-col md="6">
              <el-form-item label="Ngày sinh" prop="userInfoDTO.dateOfBirth">
                <el-date-picker
                  v-model="formData.value.userDTO.userInfoDTO.dateOfBirth"
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
                  v-model="formData.value.userDTO.userInfoDTO.town"
                  placeholder="Chọn"
                  filterable
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
                  v-model="formData.value.userDTO.userInfoDTO.address"
                  type="text"
                />
              </el-form-item>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <el-form-item label="Giới tính" prop="userInfoDTO.gender">
                <el-radio-group
                  v-model="formData.value.userDTO.userInfoDTO.gender"
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
                  v-model="formData.value.userDTO.userInfoDTO.marriageStatus"
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
                <el-select
                  v-model="formData.value.career"
                  placeholder="Chọn"
                  filterable
                >
                  <el-option
                    v-for="item in industryList.value"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
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
                  filterable
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
                  filterable
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
                  filterable
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
                <el-select
                  v-model="formData.value.workForm"
                  placeholder="Chọn"
                  filterable
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
                <!-- <el-input
                  v-model="formData.value.sortSkill"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="..."
                /> -->
                <ckeditor
                  :editor="editor"
                  v-model="formData.value.sortSkill"
                  :config="editorConfigSortSkill"
                  :disabled="editorDisabled"
                  @blur="onEditorBlur(ruleFormRef)"
                ></ckeditor>
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
              <!-- <el-input
                v-model="formData.value.workExperienceDTO.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
              /> -->
              <ckeditor
                :editor="editor"
                v-model="formData.value.workExperienceDTO.description"
                :config="editorConfigDescription"
                :disabled="editorDisabled"
                @blur="onEditorBlur(ruleFormRef)"
              ></ckeditor>
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
                  filterable
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
                  filterable
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
      </el-form>
      <div class="text-center">
        <el-button type="primary" plain @click="backToPrev">Quay lại</el-button>
        <el-button
          type="danger"
          plain
          @click="saveRecruitment"
          v-if="formData.value.isSaved"
          >Bỏ lưu</el-button
        >
        <el-button
          type="warning"
          plain
          @click="saveRecruitment"
          v-if="!formData.value.isSaved"
          >Lưu</el-button
        >
      </div>
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
:deep .ck.ck-editor {
  width: 100%;
  ul li {
    list-style: initial;
  }
}
.card__logo {
  width: auto;
  height: 120px;
  border: 1px solid #dadada;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0px #bebebe;
}
</style>
