<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import IndustryApi from '@/moduleApi/modules/IndustryApi'
import PostApi from '@/moduleApi/modules/PostApi'
import UserApi from '@/moduleApi/modules/UserApi'

import { ElNotification, ElMessage } from 'element-plus'

import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './RecruitmentPostModel'

const router = useRouter()
const ruleFormRef = ref(FormInstance)

const workFormList = DataService.workFormList
const certificateList = DataService.certificateList
const experienceList = DataService.experienceList
const probationaryPeriodList = DataService.probationaryPeriodList
const rankList = DataService.rankList
const ageRequirementList = DataService.ageRequirementList
const genderRequirementList = DataService.genderRequirementList
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList
const minSalaryList = DataService.minSalaryList
const maxSalaryList = DataService.minSalaryList

const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm
const industryList = reactive({ value: [] })
const userInfo = ref(null)

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    try {
      if(!valid) return
      formData.value.status = 'WAITING_APPROVE'
      const postApiRes = await PostApi.create(formData.value)
      if (postApiRes.status == 200) {
        ElNotification({
          title: 'Success',
          message: 'Thêm mới thành công.',
          type: 'success',
          duration: 3000,
        })
      }
      setTimeout(() => {
        backToPrev()
      }, 500)
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

const getIndustryList = async () => {
  try {
    const industryApiRes = await IndustryApi.list()
    if (industryApiRes.status == 200) {
      industryList.value = industryApiRes.data.data.data
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const getUserInfo = async () => {
  try {
    const userProfileApiRes = await UserApi.findById(localStorage.getItem('uid'))
    if (userProfileApiRes.status === 200) {
      const res = userProfileApiRes.data.data
      userInfo.value = res
      formData.value.fullNameContactor = res.userInfoDTO.fullName
      formData.value.emailContactor = res.email
      formData.value.phoneNumberContactor = res.userInfoDTO.phoneNumber
      formData.value.addressContactor = res.companyDTO.companyAddress
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

onMounted(() => {
  getIndustryList()
  getUserInfo()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h4>Tạo tin tuyển dụng</h4>
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
          <b-col md="12">
            <el-form-item label="Chức danh" prop="title">
              <el-input
                v-model="formData.value.title"
                placeholder="Vị trí hiển thị đăng tuyển"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Hình thức làm việc" prop="workingForm">
              <el-select
                v-model="formData.value.workingForm"
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
          <b-col md="4">
            <el-form-item label="Bằng cấp" prop="recruitmentDegree">
              <el-select
                v-model="formData.value.recruitmentDegree"
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
          <b-col md="4">
            <el-form-item label="Kinh nghiệm" prop="recruitmentExperience">
              <el-select
                v-model="formData.value.recruitmentExperience"
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
          <b-col md="4">
            <el-form-item label="Cấp bậc" prop="level">
              <el-select v-model="formData.value.level" placeholder="Chọn">
                <el-option
                  v-for="item in rankList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Yêu cầu độ tuổi" prop="recruitmentAge">
              <el-select
                v-model="formData.value.recruitmentAge"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in ageRequirementList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Yêu cầu giới tính" prop="recruitmentGender">
              <el-select
                v-model="formData.value.recruitmentGender"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in genderRequirementList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Số lượng tuyển" prop="numberOfRecruits">
              <el-input
                v-model="formData.value.numberOfRecruits"
                placeholder="Vui lòng nhập"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Thời gian thử việc" prop="probationaryPeriod">
              <el-select
                v-model="formData.value.probationaryPeriod"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in probationaryPeriodList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Hạn nộp hồ sơ" prop="jobApplicationDeadline">
              <el-date-picker
                v-model="formData.value.jobApplicationDeadline"
                type="date"
                format="DD/MM/YYYY"
                placeholder="Chọn"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <el-form-item label="Ngành nghề chính" prop="industryId">
              <el-select v-model="formData.value.industryId" placeholder="Chọn">
                <el-option
                  v-for="item in industryList.value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Khu vực tuyển dụng" prop="recruitmentArea">
              <el-select
                v-model="formData.value.recruitmentArea"
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
          <b-col md="4">
            <el-form-item label="Nơi làm việc" prop="workplace">
              <el-select v-model="formData.value.workplace" placeholder="Chọn">
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

        <el-divider />

        <b-row>
          <b-col md="6">
            <el-form-item label="Mức lương tối thiểu" prop="salaryMin">
              <!-- <el-select
                v-model="formData.value.salaryMin"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in minSalaryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
              <el-input
                v-model="formData.value.salaryMin"
                placeholder="Vui lòng nhập"
              />
            </el-form-item>
          </b-col>
          <b-col md="6">
            <el-form-item label="Mức lương tối đa" prop="salaryMax">
              <!-- <el-select
                v-model="formData.value.salaryMax"
                placeholder="Chọn"
              >
                <el-option
                  v-for="item in maxSalaryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
              <el-input
                v-model="formData.value.salaryMax"
                placeholder="Vui lòng nhập"
              />
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Kỹ năng cần thiết" prop="necessarySkills">
              <el-input
                type="textarea"
                v-model="formData.value.necessarySkills"
                placeholder="Vui lòng nhập"
              />
              <!-- <el-select
                v-model="formData.value.necessarySkills"
                multiple
                placeholder="Nhập các kỹ năng cần thiết cho vị trí này"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <b-col md="12">
            <el-form-item label="Mô tả công việc" prop="jobDescription">
              <el-input
                v-model="formData.value.jobDescription"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="Thông tin cho vị trí công việc yêu cầu, trách nhiệm mà ứng viên có thể đảm nhận khi làm việc ở công ty"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Yêu cầu công việc" prop="jobRequirements">
              <el-input
                v-model="formData.value.jobRequirements"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="Kỹ năng chuyên môn hoặc kỹ năng mềm cần thiết với công việc mà ứng viên cần quan tâm"
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Quyền lợi" prop="benefits">
              <el-input
                v-model="formData.value.benefits"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="Những quyền lợi, lợi ích với công việc cho ứng viên với vị trí đăng tuyển"
              />
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <h5>Thông tin người liên hệ</h5>
          <b-col md="4">
            <el-form-item label="Họ và tên" prop="">
              <el-input v-model="formData.value.fullNameContactor" disabled />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Email" prop="">
              <el-input v-model="formData.value.emailContactor" disabled />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Điện thoại" prop="">
              <el-input
                v-model="formData.value.phoneNumberContactor"
                disabled
              />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Địa chỉ liên hệ" prop="">
              <el-input
                v-model="formData.value.addressContactor"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                disabled
              />
            </el-form-item>
          </b-col>
        </b-row>

        <div class="text-right">
          <el-button @click="backToPrev">Hủy bỏ</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Tiếp tục</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
