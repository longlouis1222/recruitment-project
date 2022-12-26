<script setup>
import DataService from '@/service/DataService'

import { useRouter } from 'vue-router'
import AppHeaderLanding from '@/components/AppHeaderLanding.vue'

const router = useRouter()
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList

const bannerList = [
  {
    id: 1,
    src: require('../../assets/images/banner/hiring-career-employment-human-resources-concept.jpg'),
  },
  {
    id: 2,
    src: require('../../assets/images/banner/job-hiring-vacancy-team-interview-career-recruiting.jpg'),
  },
  {
    id: 3,
    src: require('../../assets/images/banner/portrait-business-woman-holding-speech-bubble-show-job-offer-advertising-hiring-recruitment-female-employee-using-text-message-board-give-business-career-opportunity.jpg'),
  },
  {
    id: 4,
    src: require('../../assets/images/banner/we-need-you-hiring-employment-work.jpg'),
  },
  {
    id: 5,
    src: require('../../assets/images/banner/recruitment-jobs-career-hiring-vacancy-word.jpg'),
  },
]

const backToPrev = () => {
  router.go(-1)
}
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />
    <!-- Start Carousel -->
    <CContainer xxl>
      <div class="block text-center">
        <el-carousel height="280px">
          <el-carousel-item
            v-for="item in bannerList"
            :key="item.id"
            class="banner"
          >
            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
            <img
              :src="item.src"
              :alt="item.src"
              class="banner__img"
              :style="
                item.id == 1 || item.id == 5
                  ? 'object-position: bottom 190px right 0px;'
                  : item.id == 3
                  ? 'object-position: bottom 100px right 0px;'
                  : item.id == 4
                  ? 'object-position: bottom 500px right 0px;'
                  : ''
              "
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </CContainer>
    <!-- End Carousel -->

    <!-- Start Company recruitment BLock -->
    <CContainer xl class="mt-4 company_recruitment_block">
      <b-row>
        <b-col md="2">
          <el-card class="box-card" shadow="hover">
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/04012019-07.jpg"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">22 vị trí đang tuyển</p>
            </div>
          </el-card>
        </b-col>
        <b-col md="2">
          <el-card class="box-card" shadow="hover">
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504086_143.png"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">74 vị trí đang tuyển</p>
            </div>
          </el-card>
        </b-col>
        <b-col md="2">
          <el-card class="box-card" shadow="hover">
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/vecteezy_circle-abstract-logo_1192263.png"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">12 vị trí đang tuyển</p>
            </div>
          </el-card>
        </b-col>
        <b-col md="2">
          <el-card class="box-card" shadow="hover">
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504087_507.png"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">289 vị trí đang tuyển</p>
            </div>
          </el-card>
        </b-col>
        <b-col md="2">
          <el-card class="box-card" shadow="hover">
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">18 vị trí đang tuyển</p>
            </div>
          </el-card>
        </b-col>
        <b-col md="2">
          <el-card class="box-card" shadow="hover">
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/vecteezy_triangle-logo_1200601.png"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">62 vị trí đang tuyển</p>
            </div>
          </el-card>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End Company recruitment BLock -->

    <!-- Start Urgent recruitment Job -->
    <CContainer xxl class="mt-4 urgent_recruitment_job">
      <el-card class="box-card">
        <template #header>
          <div class="card-header d-flex align-items-center">
            <img
              src="@/assets/images/clock-ringing.png"
              alt="clock-ringing"
              style="width: 5%"
            />
            <h4 class="ms-2 me-4">Việc làm tuyển gấp</h4>
            <el-divider direction="vertical" />
            <p class="m-0 me-4 ms-4">Tất cả</p>
            <p class="m-0 me-4">Việc làm theo chuyên môn</p>
            <p class="m-0 me-4">Việc làm quản lý</p>
            <p class="m-0 me-4">Lao động phổ thông</p>
            <p class="m-0 me-4">Bán thời gian</p>
          </div>
        </template>
        <b-row class="mb-3">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_circle-abstract-logo_1192263.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_circle-abstract-logo_1192263.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_circle-abstract-logo_1192263.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">Công ty cổ phần Phần mềm ABC</p>
                  <span class="card__subtitle me-3"> <el-icon><Money /></el-icon> 10 - 20 triệu</span>
                  <span class="card__subtitle"><el-icon><Location /></el-icon>Hà Nội</span>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
      </el-card>
    </CContainer>
    <!-- End Urgent recruitment Job -->

    <!-- Start Banner discovery Job -->
    <CContainer xxl class="mt-4">
      <img src="../../assets/images/banner/banner-home-pc-2.png" alt="banner-home-pc-2.png" class="w-100">
    </CContainer>
    <!-- Start Banner discovery Job -->

    <!-- Start New recruitment Job -->
    <CContainer xxl class="mt-4 new_recruitment_job">
      <el-card class="box-card">
        <template #header>
          <div class="card-header d-flex align-items-center">
            <img
              src="@/assets/images/new-post.png"
              alt="clock-ringing"
              style="width: 5%"
            />
            <h4 class="ms-2 me-4">Việc làm mới nhất</h4>
            <el-divider direction="vertical" />
            <p class="m-0 me-4 ms-4">Tất cả</p>
            <p class="m-0 me-4">Việc làm theo chuyên môn</p>
            <p class="m-0 me-4">Việc làm quản lý</p>
            <p class="m-0 me-4">Lao động phổ thông</p>
            <p class="m-0 me-4">Bán thời gian</p>
          </div>
        </template>
        <b-row class="mb-3">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504087_507.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504086_143.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504087_507.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504086_143.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504087_507.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504086_143.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Front-end developer</p>
                  <p class="card__title-company ms-2">Công ty cổ phần Phần mềm ABC</p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1"><el-icon><LocationInformation /></el-icon>Hà Nội</p>
                    <p class="card__subtitle mb-1"><el-icon><Money /></el-icon> 10 - 20 triệu</p>
                    <p class="card__subtitle mb-0"><el-icon><Timer /></el-icon>09/12/2023</p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
      </el-card>
    </CContainer>
    <!-- End New recruitment Job -->

    <!-- Start Discovery recruitment Job -->
    <CContainer xl class="mt-4 container-discovery">
      <div class="d-flex align-items-center mb-4">
        <CIcon class="" icon="cilSearch" size="lg" />
        <h4 class="ms-2 me-4">Khám phá</h4>
        <!-- <img src="@/assets/images/new-post.png" alt="clock-ringing" style="width: 5%"> -->
      </div>
      <b-row class="mb-3">
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm quản lý</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm IT</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm mới</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm bán thời gian</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm lương cao</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm từ xa</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm tốt nhất</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilSearch" size="lg" />
            </div>
            <h5>Việc làm khác</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End Discovery recruitment Job -->

    <!-- Start Recommend type job -->
    <CContainer xl class="mt-4 container-recommend">
      <b-row>
        <b-col md="4">
          <el-card class="box-card">
            <template #header>
              <div class="card-header d-flex align-items-center">
                <h6 class="ms-2 me-4">Việc làm theo ngành nghề</h6>
              </div>
            </template>
            <b-row>
              <b-col md="12">
                <ul class="ps-2">
                  <li class="pb-1" v-for="job in mainJobList" :key="job.value">
                    <el-link>Việc làm {{ job.label }}</el-link>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </el-card>
        </b-col>
        <b-col md="4">
          <el-card class="box-card">
            <template #header>
              <div class="card-header d-flex align-items-center">
                <h6 class="ms-2 me-4">Việc làm theo Khu vực</h6>
              </div>
            </template>
            <b-row>
              <b-col md="12">
                <ul class="ps-2">
                  <li class="pb-1" v-for="job in workPlaceList" :key="job.value">
                    <el-link>Việc làm {{ job.label }}</el-link>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </el-card>
        </b-col>
        <b-col md="4">
          <el-card class="box-card">
            <template #header>
              <div class="card-header d-flex align-items-center">
                <h6 class="ms-2 me-4">Việc làm mới</h6>
              </div>
            </template>
            <b-row>
              <b-col md="12">
                <ul class="ps-2">
                  <li class="pb-1" v-for="job in secondJobList" :key="job.value">
                    <el-link>Việc làm {{ job.label }}</el-link>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </el-card>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End Recommend type job -->

    <div class="footer">
      <CContainer class="mt-4">
        <b-row>
          <b-col md="6">
            <h5 class="mb-3">HotLine cho Người tìm việc</h5>
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <img
                  src="@/assets/images/new-post.png"
                  alt="clock-ringing"
                  style="width: 5%"
                />
                <div>
                  <p class="ms-2">Hotline hỗ trợ miền Bắc</p>
                  <p>HN: (024) 2567 6969</p>
                </div>
              </div>
              <el-divider direction="vertical" />
              <div class="d-flex align-items-center">
                <img
                  src="@/assets/images/new-post.png"
                  alt="clock-ringing"
                  style="width: 5%"
                />
                <div>
                  <p class="ms-2">Hotline hỗ trợ miền Bắc</p>
                  <p>HCM: (0248) 2667 6969</p>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </CContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .container-recommend {
  .el-card {
    background-color: aliceblue;
  }
  .el-card__body {
    height: 300px;
    overflow: auto;
  }
}
// ::v-deep .container-recommend {
//   //
// }
.icon-block {
  width: fit-content;
  height: auto;
  padding: 10px;
  border-radius: 12px;
  background-color: aliceblue;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #76787a;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.footer {
  margin-top: 50px;
  background: url('@/assets/images/img-recruitment.jpg') no-repeat cover;
}
.banner {
  .banner__img {
    width: 100%;
    height: fit-content;
    // &:nth-of-type(1) {
    //   object-position: bottom 190px right 0px;
    // }
  }
}

.company_recruitment_block {
  .card__logo {
    width: 100%;
    height: 100px;
  }
  .card__title {
    font-size: 13px;
    font-weight: 600;
  }
  .card__subtitle {
    font-size: 13px;
    font-weight: 600;
  }
}
.urgent_recruitment_job {
  .card__logo {
    width: 25%;
    height: 75px;
  }
  .card__title-position {
    font-size: 13px;
    font-weight: 600;
  }
  .card__title-company {
    font-size: 13px;
    color: #76787a;
    font-weight: 600;
  }
  .card__subtitle {
    font-size: 13px;
    font-weight: 600;
  }
}
.new_recruitment_job {
  .card__logo {
    width: 22%;
    height: 70px;
    border: 1px solid #dadada;
    border-radius: 4px;
  }
  .card__title-position {
    font-size: 13px;
    font-weight: 600;
  }
  .card__title-company {
    font-size: 13px;
    color: #76787a;
    font-weight: 600;
  }
  .card__subtitle {
    font-size: 13px;
    font-weight: 600;
  }
}
</style>
