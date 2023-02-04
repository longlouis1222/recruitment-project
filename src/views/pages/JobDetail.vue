<script setup>
import DataService from '@/service/DataService'
import MethodService from '@/service/MethodService'

import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import AppFooterLanding from '@/components/AppFooterLanding.vue'

import PostApi from '@/moduleApi/modules/PostApi'
import UserApi from '@/moduleApi/modules/UserApi'

import { ElNotification, ElMessage } from 'element-plus'

import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList

const postInfo = ref(null)

const backToPrev = () => {
  router.go(-1)
}

const getPostById = async () => {
  try {
    const res = await PostApi.findById(route.params.id)
    if (res.status === 200) {
      postInfo.value = res.data.data
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const applyJob = async () => {
  try {
    const res = await UserApi.applyJob(route.params.id)
    if (res.status === 200) {
      ElNotification({
        title: 'Success',
        message: 'Nộp hồ sơ thành công.',
        type: 'success',
        duration: 3000,
      })
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Nộp hồ sơ thất bại.',
      type: 'error',
      duration: 3000,
    })
  }
}

const saveToCareList = async () => {
  try {
    const res = await PostApi.saveToCare(route.params.id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Lưu tin tuyển dụng thành công.`,
      })
      postInfo.value.userCurrentSaved = true
    }
  } catch (error) {
    ElMessage({
      message: 'Lưu tin tuyển dụng thất bại.',
      type: 'error',
    })
  }
}

const unSaveFromCareList = async () => {
  try {
    const res = await PostApi.removeSavePost(route.params.id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Bỏ lưu tin tuyển dụng thành công.`,
      })
      postInfo.value.userCurrentSaved = false
    }
  } catch (error) {
    ElMessage({
      message: 'Bỏ lưu tin tuyển dụng thất bại.',
      type: 'error',
    })
  }
}
onMounted(() => {
  getPostById()
})
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />
    <!-- Start Job mutual info -->
    <CContainer xxl>
      <el-card class="box-card">
        <template #header>
          <div
            class="
              card-header
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <div class="d-flex align-items-center">
              <img
                src="../../assets/images/logo-company/04012019-07.jpg"
                alt="logo-company"
                class="card__logo"
              />
              <div>
                <h5 class="ms-3">
                  {{
                    postInfo && postInfo.companyDTO && postInfo.companyDTO.name
                      ? postInfo.companyDTO.name
                      : 'Công ty Cổ Phần Phần mềm LL'
                  }}
                </h5>
                <p class="text-black-50 ms-3 mb-0">
                  {{
                    postInfo ? postInfo.numberOfRecruits + ' người' : '12 người'
                  }}
                </p>
              </div>
            </div>
            <div class="d-flex align-items-center" @click="backToPrev">
              <el-link :underline="false"
                ><span>Quay lại</span>
                <el-icon class="mt-1 ms-2"><Right /></el-icon
              ></el-link>
            </div>
          </div>
        </template>
        <h3 class="mb-2">
          {{
            postInfo && postInfo.title
              ? postInfo.title
              : 'Nhân viên Kỹ thuật (Fullstack Developer)'
          }}
        </h3>
        <div class="d-flex align-items-center small mb-3">
          <div class="d-flex align-items-center mb-3 me-4">
            <el-icon class="text-black-50"><Calendar /></el-icon
            ><span
              >Hạn nộp hồ sơ:
              {{
                postInfo && postInfo.jobApplicationDeadline
                  ? MethodService.formatDate(
                      postInfo.jobApplicationDeadline,
                      'date',
                    )
                  : '12/02/2023'
              }}</span
            >
          </div>
          <div class="d-flex align-items-center mb-3 me-4">
            <el-icon class="text-black-50"><View /></el-icon
            ><span
              >Lượt xem:
              {{ postInfo && postInfo.view ? postInfo.view : 0 }}</span
            >
          </div>
          <div class="d-flex align-items-center mb-3">
            <el-icon class="text-black-50"><Clock /></el-icon
            ><span
              >Ngày đăng:
              {{
                postInfo && postInfo.dateSubmit
                  ? MethodService.formatDate(postInfo.dateSubmit, 'date')
                  : '12/02/2023'
              }}</span
            >
          </div>
        </div>

        <div>
          <el-button type="primary" size="large" @click="applyJob" :disabled="postInfo && postInfo.userCurrentSubmited"
            >Nộp hồ sơ</el-button
          >
          <el-button
            type="primary"
            plain
            size="large"
            @click="saveToCareList"
            v-if="postInfo && !postInfo.userCurrentSaved"
          >
            <el-icon><CirclePlus /></el-icon>Lưu</el-button
          >
          <el-button
            type="danger"
            plain
            size="large"
            @click="unSaveFromCareList"
            v-else
          >
            <el-icon><RemoveFilled /></el-icon>Bỏ lưu</el-button
          >
        </div>

        <el-divider />

        <div class="d-flex align-items-center justify-content-between">
          <div>
            <p class="text-black-50">Yêu cầu kinh nghiệm</p>
            <p>
              {{
                postInfo && postInfo.recruitmentExperience
                  ? postInfo.recruitmentExperience
                  : '1 năm'
              }}
            </p>
          </div>
          <el-divider direction="vertical" />
          <div>
            <p class="text-black-50">Mức lương</p>
            <p>
              {{
                postInfo && postInfo.salaryMin && postInfo.salaryMax
                  ? MethodService.formatCurrency(postInfo.salaryMin) +
                    ' - ' +
                    MethodService.formatCurrency(postInfo.salaryMax)
                  : '20 - 30 triệu'
              }}
            </p>
          </div>
          <el-divider direction="vertical" />
          <div>
            <p class="text-black-50">Cấp bậc</p>
            <p>
              {{
                postInfo && postInfo.level
                  ? postInfo.level
                  : 'chuyên viên - nhân viên'
              }}
            </p>
          </div>
          <el-divider direction="vertical" />
          <div>
            <p class="text-black-50">Hình thức làm việc</p>
            <p>
              {{
                postInfo && postInfo.workingForm
                  ? postInfo.workingForm
                  : 'Toàn thời gian cố định'
              }}
            </p>
          </div>
        </div>

        <el-divider />

        <h4 class="mb-3">Thông tin</h4>
        <b-row>
          <b-col md="6">
            <b-row>
              <b-col md="5">
                <p class="text-black-50">Nghề nghiệp:</p>
              </b-col>
              <b-col md="7">
                <p>
                  {{
                    postInfo && postInfo.title
                      ? postInfo.title
                      : 'Nhân viên Kỹ thuật (Fullstack Developer)'
                  }}
                </p>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="5">
                <p class="text-black-50">Số lượng tuyển:</p>
              </b-col>
              <b-col md="7">
                <p>
                  {{
                    postInfo ? postInfo.numberOfRecruits + ' người' : '12 người'
                  }}
                </p>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="5">
                <p class="text-black-50">Hạn nộp hồ sơ:</p>
              </b-col>
              <b-col md="7">
                <p>
                  {{
                    postInfo && postInfo.jobApplicationDeadline
                      ? MethodService.formatDate(
                          postInfo.jobApplicationDeadline,
                          'date',
                        )
                      : '12/02/2023'
                  }}
                </p>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <b-row>
              <b-col md="5">
                <p class="text-black-50">Khu vực tuyển:</p>
              </b-col>
              <b-col md="7">
                <p>
                  {{
                    postInfo && postInfo.recruitmentArea
                      ? postInfo.recruitmentArea
                      : 'Hà Nội'
                  }}
                </p>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="5">
                <p class="text-black-50">Yêu cầu bằng cấp:</p>
              </b-col>
              <b-col md="7">
                <p>
                  {{
                    postInfo && postInfo.recruitmentDegree
                      ? postInfo.recruitmentDegree
                      : 'Đại học'
                  }}
                </p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </el-card>
    </CContainer>
    <!-- End Job mutual info -->

    <!-- Start Job Description -->
    <CContainer xxl class="container__job-description mt-3">
      <el-card class="box-card">
        <h4 class="mb-3">Mô tả công việc</h4>
        <ul>
          <li>
            {{
              postInfo && postInfo.jobDescription ? postInfo.jobDescription : ''
            }}
          </li>
        </ul>
        <ul v-if="!postInfo || (postInfo && !postInfo.jobDescription)">
          <li>
            Tìm kiếm dự án để giới thiệu và marketing sản phẩm, xây dựng mối
            quan hệ với các đối tác của dự án
          </li>
          <li>Khảo sát thị trường để lập danh mục các dự án tiềm năng.</li>
          <li>
            Giới thiệu sản phẩm của Milan cung cấp (Gạch trang trí, nội thất,
            thiết bị phòng tắm nhập khẩu Italy và Spanin) tới các đơn vị và cá
            nhân, các công ty Kiến Trúc, Kiến trúc sư, các nhà sản xuất nội
            thất, các dự án, các chủ đầu tư..
          </li>
          <li>Theo dõi và chăm sóc khách hàng .</li>
          <li>Ký kết đơn hàng, và theo dõi đơn hàng</li>
        </ul>

        <p class="mt-2">Nơi làm việc</p>
        <ul>
          <li>
            {{ postInfo && postInfo.workplace ? postInfo.workplace : 'Hà Nội' }}
          </li>
        </ul>

        <h4 class="mt-4 mb-3">Yêu cầu công việc</h4>
        <ul>
          <li>
            {{
              postInfo && postInfo.jobRequirements
                ? postInfo.jobRequirements
                : ''
            }}
          </li>
        </ul>
        <ul v-if="!postInfo || (postInfo && !postInfo.jobRequirements)">
          <li>
            Nam/Nữ tốt nghiệp đại học các chuyên ngành liên quan có quan hệ tốt,
            biết đến các dự án xây dựng lớn.
          </li>
          <li>
            Kỹ năng: Giao tiếp tốt, sáng tạo, năng động, trách nhiệm cao với
            công việc
          </li>
        </ul>

        <h4 class="mt-4 mb-3">Quyền lợi</h4>
        <ul>
          <li>
            {{ postInfo && postInfo.benefits ? postInfo.benefits : '' }}
          </li>
        </ul>
        <ul v-if="!postInfo || (postInfo && !postInfo.benefits)">
          <li>
            Thu nhập: Lương cơ bản 18 - 20 triệu + thưởng % doanh số trên từng
            dự án. Thu nhập trung bình 20-30 Triệu tùy theo năng lực.
          </li>
          <li>Được hưởng các chế độ như nhà nước quy định.</li>
          <li>
            Được hưởng đầy đủ BHXH, BHYT và BHTN theo Luật lao động Việt Nam
            hiện hành.
          </li>
          <li>
            Làm việc trong môi trường năng động, sáng tạo, nhiều cơ hội thăng
            tiến trong công việc.
          </li>
          <li>
            Được thưởng tháng lương thứ 13 tuỳ theo kết quả kinh doanh của công
            ty.
          </li>
        </ul>

        <div class="mt-4">
          <el-button type="primary" size="large" @click="applyJob" :disabled="postInfo && postInfo.userCurrentSubmited"
            >Nộp hồ sơ</el-button
          >
          <el-button
            type="primary"
            plain
            size="large"
            @click="saveToCareList"
            v-if="postInfo && !postInfo.userCurrentSaved"
          >
            <el-icon><CirclePlus /></el-icon>Lưu</el-button
          >
          <el-button
            type="danger"
            plain
            size="large"
            @click="unSaveFromCareList"
            v-else
          >
            <el-icon><RemoveFilled /></el-icon>Bỏ lưu</el-button
          >
        </div>
      </el-card>
    </CContainer>
    <!-- End Job Description -->

    <!-- Start Company info -->
    <CContainer xxl class="mt-3 mb-4">
      <el-card class="box-card">
        <h3 class="mb-3">
          {{
            postInfo && postInfo.companyDTO && postInfo.companyDTO.name
              ? postInfo.companyDTO.name
              : 'Công ty Cổ Phần Phần mềm LL'
          }}
        </h3>
        <div class="d-flex align-items-center">
          <p class="text-black-50 me-1">Địa chỉ:</p>
          <p>
            {{
              postInfo &&
              postInfo.companyDTO &&
              postInfo.companyDTO.companyAddress
                ? postInfo.companyDTO.companyAddress
                : 'Số 86 Mễ Trì Hạ, Nam Từ Liêm, Hà Nội'
            }}
          </p>
        </div>
        <div class="d-flex align-items-center">
          <p class="text-black-50 me-1">Số lượng tuyển:</p>
          <p>
            {{ postInfo ? postInfo.numberOfRecruits + ' người' : '12 người' }}
          </p>
        </div>
        <div class="d-flex align-items-center">
          <p class="text-black-50 me-1">Người liên hệ:</p>
          <p>
            {{
              postInfo &&
              postInfo.companyDTO &&
              postInfo.companyDTO.userInfoDTO &&
              postInfo.companyDTO.userInfoDTO.fullName
                ? postInfo.companyDTO.userInfoDTO.fullName
                : 'Mr Long'
            }}
          </p>
        </div>
      </el-card>
    </CContainer>
    <!-- End Company info -->
    <CContainer xxl class="mt-3 mb-4">
      <div class="d-flex align-items-center mt-3 mb-4" @click="backToPrev">
        <el-link :underline="false"
          ><el-icon class="mt-1 ms-2"><Back /></el-icon
          ><span>Quay lại</span></el-link
        >
      </div>
    </CContainer>
    <AppFooterLanding />
  </div>
</template>

<style lang="scss" scoped>
.card__logo {
  width: auto;
  height: 95px;
  border: 1px solid #dadada;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0px #bebebe;
}
:deep .el-divider--vertical {
  height: 35px;
}

:deep .container__job-description {
  ul li {
    list-style: disc;
  }
}
</style>
