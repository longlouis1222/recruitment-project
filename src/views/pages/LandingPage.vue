<script setup>
import DataService from '@/service/DataService'
import MethodService from '@/service/MethodService'

import PostApi from '@/moduleApi/modules/PostApi'
import CompanyApi from '@/moduleApi/modules/CompanyApi'
import IndustryApi from '@/moduleApi/modules/IndustryApi'

import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import AppFooterLanding from '@/components/AppFooterLanding.vue'

import { ElNotification, ElMessage } from 'element-plus'

import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import modelData from './FindJobsModel'

const router = useRouter()
const store = useStore()

const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList

const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const companyList = reactive({ value: [], total: 0 })
const outstandingPostList = reactive({ value: [] })
const newestPostList = reactive({ value: [], total: 0 })
const industryList = reactive({ value: [] })
const industryHotList = reactive({ value: [] })

const iconList = [
  'cilStorage',
  'cibSitepoint',
  'cilNewspaper',
  'cilAvTimer',
  'cilMoney',
  'cilGraph',
  'cilMoodGood',
  'cilSearch',
]
const bannerList = [
  {
    id: 1,
    src: require('../../assets/images/banner/hiring-career-employment-human-resources-concept-min.jpg'),
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
    src: require('../../assets/images/banner/we-need-you-hiring-employment-work-min.jpg'),
  },
  {
    id: 5,
    src: require('../../assets/images/banner/recruitment-jobs-career-hiring-vacancy-word.jpg'),
  },
]

const backToPrev = () => {
  router.go(-1)
}

const goToJobDetail = (id) => {
  router.push({ name: 'Job detail', params: { id: id } })
}

const goToCompanyDetail = (id) => {
  router.push({ name: 'Company detail', params: { id: id ? id : 1 } })
}

const goToResgister = () => {
  router.push({ name: 'Register' })
}

const goToFindJob = (query, workplace) => {
  if (query) router.push({ name: 'Find jobs', query: { industryId: query } })
  else if (workplace)
    router.push({ name: 'Find jobs', query: { recruitmentArea: workplace } })
  else router.push({ name: 'Find jobs' })
}

const fn_tableSizeChange = (limit) => {
  tableRules.limit = limit
  fn_tableChangeOffset(1)
}
const fn_tableCurentChange = (page) => {
  fn_tableChangeOffset(page)
}
const fn_tablePrevClick = () => {
  // fn_tableChangeOffset(page);
}
const fn_tableNextClick = () => {
  // fn_tableChangeOffset(page);
}
const fn_tableChangeOffset = (page) => {
  tableRules.page = page
  tableRules.skip = (tableRules.page - 1) * tableRules.limit
  getOutstandingJob()
}

const getOutstandingJob = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    isOutstanding: true,
    ...tableRules.filters,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const postApiRes = await PostApi.list(filter)
  if (postApiRes.status === 200) {
    outstandingPostList.value = postApiRes.data.data.data
    outstandingPostList.total = postApiRes.data.data.totalElements
  }
}

const getNewestJob = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    ...tableRules.filters,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const postApiRes = await PostApi.list(filter)
  if (postApiRes.status === 200) {
    newestPostList.value = postApiRes.data.data.data
    newestPostList.total = postApiRes.data.data.totalElements
  }
}

const getCompanyList = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    ...tableRules.filters,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const companyApires = await CompanyApi.list(filter)
  if (companyApires.status === 200) {
    companyList.value = companyApires.data.data.data
  }
}

const handleAction = (action, id, fromList) => {
  if (action === 'save') {
    saveToCareList(id)
    if (fromList === 'outstandingPostList') {
      const post = outstandingPostList.value.find((o) => o.id === id)
      if (post) post.userCurrentSaved = true
    } else if (fromList === 'newestPostList') {
      const post = newestPostList.value.find((o) => o.id === id)
      if (post) post.userCurrentSaved = true
    }
  } else if (action === 'unSave') {
    unSaveFromCareList(id)
    if (fromList === 'outstandingPostList') {
      const post = outstandingPostList.value.find((o) => o.id === id)
      if (post) post.userCurrentSaved = false
    } else if (fromList === 'newestPostList') {
      const post = newestPostList.value.find((o) => o.id === id)
      if (post) post.userCurrentSaved = false
    }
  }
}

const saveToCareList = async (id) => {
  try {
    const res = await PostApi.saveToCare(id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Lưu tin tuyển dụng thành công.`,
      })
    }
  } catch (error) {
    ElMessage({
      message: 'Lưu tin tuyển dụng thất bại.',
      type: 'error',
    })
  }
}

const unSaveFromCareList = async (id) => {
  try {
    const res = await PostApi.removeSavePost(id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Bỏ lưu tin tuyển dụng thành công.`,
      })
    }
  } catch (error) {
    ElMessage({
      message: 'Bỏ lưu tin tuyển dụng thất bại.',
      type: 'error',
    })
  }
}

const getHotIndustriesList = async () => {
  try {
    const res = await IndustryApi.list('size=99999')
    if (res.status === 200) {
      industryList.value = sortUpdatedIndustries(res.data.data.data)
      industryHotList.value = sortHotIndustries(res.data.data.data)
    }
  } catch (error) {
    console.log(error)
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const sortHotIndustries = (data) => {
  return data.sort((a, b) => b.numberSummit - a.numberSummit)
}

const sortUpdatedIndustries = (data) => {
  return data.sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime(),
  )
}

onMounted(() => {
  getHotIndustriesList()
  getCompanyList()
  getOutstandingJob()
  getNewestJob()
})
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding
      :industryList="industryList.value"
      :industryHotList="industryHotList.value"
    />
    <!-- Start Carousel -->
    <CContainer xxl>
      <div class="block text-center">
        <el-carousel height="320px">
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
      <!-- Start Real data -->
      <b-row>
        <b-col md="2" v-for="company in companyList.value" :key="company.id">
          <el-card
            class="box-card"
            shadow="hover"
            @click="goToCompanyDetail(company.id)"
          >
            <div class="d-flex flex-column justify-content-center text-center">
              <img
                src="../../assets/images/logo-company/04012019-07.jpg"
                alt="logo-company"
                class="card__logo mx-auto"
              />
              <p class="card__title">
                {{
                  company.numberPositionSubmit
                    ? company.numberPositionSubmit
                    : '22'
                }}
                vị trí đang tuyển
              </p>
            </div>
          </el-card>
        </b-col>
      </b-row>
      <!-- End Real data -->

      <!-- Start Fake data -->
      <b-row>
        <b-col md="2">
          <el-card class="box-card" shadow="hover" @click="goToCompanyDetail">
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
          <el-card class="box-card" shadow="hover" @click="goToCompanyDetail">
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
          <el-card class="box-card" shadow="hover" @click="goToCompanyDetail">
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
          <el-card class="box-card" shadow="hover" @click="goToCompanyDetail">
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
      <!-- End Fake data -->
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
            <el-link :underline="false" class="m-0 me-4 ms-4">Tất cả</el-link>
            <el-link :underline="false" class="m-0 me-4"
              >Việc làm theo chuyên môn</el-link
            >
            <el-link :underline="false" class="m-0 me-4"
              >Việc làm quản lý</el-link
            >
            <el-link :underline="false" class="m-0 me-4"
              >Lao động phổ thông</el-link
            >
            <el-link :underline="false" class="m-0 me-4">Bán thời gian</el-link>
          </div>
        </template>

        <!-- Start Real data -->
        <b-row>
          <b-col
            md="4"
            class="mb-3"
            v-for="post in outstandingPostList.value"
            :key="post.id"
          >
            <el-card class="box-card" shadow="hover">
              <div class="d-flex justify-content-between align-items-center">
                <p
                  class="card__title-position mb-2"
                  @click="goToJobDetail(post.id)"
                >
                  {{ post.title }}
                </p>
                <CIcon
                  icon="cibMacys"
                  :class="{
                    'mb-2': true,
                    'c-turquoise': post.userCurrentSaved,
                  }"
                  @click="
                    handleAction(
                      `${post.userCurrentSaved ? 'unSave' : 'save'}`,
                      post.id,
                      'outstandingPostList',
                    )
                  "
                />
              </div>
              <div
                class="d-flex align-items-center"
                @click="goToJobDetail(post.id)"
              >
                <img
                  src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <p class="card__title-company">
                      {{
                        post.companyDTO && post.companyDTO.name
                          ? post.companyDTO.name
                          : ''
                      }}
                    </p>
                    <el-tag type="danger" v-if="post.isOutstanding">
                      HOT
                    </el-tag>
                    <!-- <img src="../../assets/gifs/hot.gif" /> -->
                  </div>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon
                    >{{
                      MethodService.formatCurrencyShort(post.salaryMin) +
                      ' - ' +
                      MethodService.formatCurrencyShort(post.salaryMax)
                    }}
                  </span>
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>{{ post.workplace }}</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <!-- Start Real data -->

        <!-- Start Fake data -->
        <b-row class="mb-3" v-if="outstandingPostList.value.length === 0">
          <b-col md="4">
            <el-card class="box-card" shadow="hover" @click="goToJobDetail">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 10 - 20 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover" @click="goToJobDetail">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/04012019-07.jpg"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 10 - 20 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover" @click="goToJobDetail">
              <p class="card__title-position mb-2">Front-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/vecteezy_circle-abstract-logo_1192263.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 10 - 20 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3" v-if="outstandingPostList.value.length === 0">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Fullstack developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/icons8-canvas-student-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 18 - 23 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Back-end developer</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/icons8-bbb-150.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 10 - 22 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Bussiness Analystic</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/icons8-monzo-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 10 - 20 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3" v-if="outstandingPostList.value.length === 0">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Project manager</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/icons8-powerschool-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 19 - 30 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Tester</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/icons8-magento-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 15 - 20 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <p class="card__title-position mb-2">Security Config</p>
              <div class="d-flex align-items-center">
                <img
                  src="../../assets/images/logo-company/icons8-notion-256.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="">
                  <p class="card__title-company">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <span class="card__subtitle me-3">
                    <el-icon><Money /></el-icon> 25 - 30 triệu</span
                  >
                  <span class="card__subtitle"
                    ><el-icon><Location /></el-icon>Hà Nội</span
                  >
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <!-- End Fake data -->

        <div class="mt-3 mb-3">
          <el-pagination
            small
            v-model:currentPage="tableRules.page"
            v-model:pageSize="tableRules.limit"
            :page-sizes="tableRules.lengthMenu"
            background
            layout="prev, pager, next"
            :total="Number(outstandingPostList.total)"
            @size-change="fn_tableSizeChange"
            @current-change="fn_tableCurentChange"
            @prev-click="fn_tablePrevClick"
            @next-click="fn_tableNextClick"
          />
        </div>
      </el-card>
    </CContainer>
    <!-- End Urgent recruitment Job -->

    <!-- Start Banner discovery Job -->
    <CContainer xxl class="mt-4">
      <img
        src="../../assets/images/banner/banner-home-pc-2.png"
        alt="banner-home-pc-2.png"
        class="w-100 cursor-pointer"
        @click="goToResgister"
      />
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
            <el-link :underline="false" class="m-0 me-4 ms-4">Tất cả</el-link>
            <el-link :underline="false" class="m-0 me-4"
              >Việc làm theo chuyên môn</el-link
            >
            <el-link :underline="false" class="m-0 me-4"
              >Việc làm quản lý</el-link
            >
            <el-link :underline="false" class="m-0 me-4"
              >Lao động phổ thông</el-link
            >
            <el-link :underline="false" class="m-0 me-4">Bán thời gian</el-link>
          </div>
        </template>
        <!-- Start Fake data -->
        <b-row>
          <b-col
            md="4"
            class="mb-3"
            v-for="post in newestPostList.value"
            :key="post.id"
          >
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-notion-256.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div class="w-100">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <p
                      class="card__title-position mb-1 ms-2"
                      @click="goToJobDetail(post.id)"
                    >
                      {{ post.title ? post.title : '' }}
                    </p>
                    <CIcon
                      icon="cibMacys"
                      :class="{
                        'mb-1': true,
                        'c-turquoise': post.userCurrentSaved,
                      }"
                      @click="
                        handleAction(
                          `${post.userCurrentSaved ? 'unSave' : 'save'}`,
                          post.id,
                          'newestPostList',
                        )
                      "
                    />
                  </div>
                  <div
                    class="d-flex justify-content-between ms-2"
                    @click="goToJobDetail(post.id)"
                  >
                    <p class="card__title-company mb-1">
                      {{
                        post.companyDTO && post.companyDTO.name
                          ? post.companyDTO.name
                          : ''
                      }}
                    </p>
                    <el-tag type="danger" v-if="post.isOutstanding">
                      HOT
                    </el-tag>
                  </div>
                  <div class="ms-2 mt-2" @click="goToJobDetail(post.id)">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon
                      >{{ post.workplace }}
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon>
                      {{
                        MethodService.formatCurrencyShort(post.salaryMin) +
                        ' - ' +
                        MethodService.formatCurrencyShort(post.salaryMax)
                      }}
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>
                      {{
                        MethodService.formatDate(
                          post.jobApplicationDeadline,
                          'date',
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <!-- End Fake data -->

        <!-- Start Fake data -->
        <b-row class="mb-3" v-if="newestPostList.value.length === 0">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-notion-256.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Fresher</p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 10 - 12 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-magento-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">
                    Front-end developer
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 15 - 20 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-canvas-student-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">
                    Front-end developer
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm LL
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 20 - 30 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3" v-if="newestPostList.value.length === 0">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-powerschool-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">Tester (QA)</p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 14 - 22 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
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
                  <p class="card__title-position mb-1 ms-2">
                    Project management
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 22 - 30 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
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
                  <p class="card__title-position mb-1 ms-2">
                    Fullstack developer
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 19 - 25 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <b-row class="mb-3" v-if="newestPostList.value.length === 0">
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/vecteezy_natural-theme-sign-logo_8504087_507.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">
                    Fullstack developer (Senior)
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 10 - 20 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-monzo-250.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">
                    Vue.js developer (Middle)
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 18 - 25 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
          <b-col md="4">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-bbb-150.png"
                  alt="logo-company"
                  class="card__logo"
                />
                <div>
                  <p class="card__title-position mb-1 ms-2">
                    Front-end developer (Reactjs)
                  </p>
                  <p class="card__title-company ms-2">
                    Công ty cổ phần Phần mềm ABC
                  </p>
                  <div class="ms-2 mt-2">
                    <p class="card__subtitle mb-1">
                      <el-icon><LocationInformation /></el-icon>Hà Nội
                    </p>
                    <p class="card__subtitle mb-1">
                      <el-icon><Money /></el-icon> 15 - 20 triệu
                    </p>
                    <p class="card__subtitle mb-0">
                      <el-icon><Timer /></el-icon>09/12/2023
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </b-col>
        </b-row>
        <!-- End Fake data -->
        <div class="mt-3 mb-3">
          <el-pagination
            small
            v-model:currentPage="tableRules.page"
            v-model:pageSize="tableRules.limit"
            :page-sizes="tableRules.lengthMenu"
            background
            layout="prev, pager, next"
            :total="Number(newestPostList.total)"
            @size-change="fn_tableSizeChange"
            @current-change="fn_tableCurentChange"
            @prev-click="fn_tablePrevClick"
            @next-click="fn_tableNextClick"
          />
        </div>
      </el-card>
    </CContainer>
    <!-- End New recruitment Job -->

    <!-- Start Discovery recruitment Job -->
    <CContainer xl class="mt-4 mb-5 container-discovery">
      <div class="d-flex align-items-center mb-4">
        <CIcon class="" icon="cilSearch" size="lg" />
        <h4 class="ms-2 me-4">Khám phá</h4>
        <!-- <img src="@/assets/images/new-post.png" alt="clock-ringing" style="width: 5%"> -->
      </div>
      <b-row class="mb-3">
        <b-col
          md="3"
          class="mb-3"
          v-for="(industry, i) in industryHotList.value &&
          industryHotList.value.length > 0
            ? industryHotList.value
            : mainJobList"
          :key="
            industryHotList.value && industryHotList.value.length > 0
              ? industry.id
              : industry.value
          "
          :style="i > 7 ? 'display: none' : ''"
        >
          <el-card
            class="box-card"
            shadow="hover"
            @click="goToFindJob(industry.id)"
          >
            <div class="icon-block mb-3">
              <!-- <CIcon class="" icon="cilStorage" size="lg" /> -->
              <CIcon class="" :icon="iconList[i]" size="lg" />
            </div>
            <h5
              class="text-overflow"
              :title="
                industryHotList.value && industryHotList.value.length > 0
                  ? industry.name
                  : industry.label
              "
            >
              Việc làm
              {{
                industryHotList.value && industryHotList.value.length > 0
                  ? industry.name
                  : industry.label
              }}
            </h5>
            <p>
              {{
                industryHotList.value && industryHotList.value.length > 0
                  ? industry.numberSummit
                  : 0
              }}
              việc làm
            </p>
          </el-card>
        </b-col>
        <!-- <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cibSitepoint" size="lg" />
            </div>
            <h5>Việc làm IT</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilNewspaper" size="lg" />
            </div>
            <h5>Việc làm mới</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilAvTimer" size="lg" />
            </div>
            <h5>Việc làm bán thời gian</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col> -->
      </b-row>
      <!-- <b-row class="mb-3">
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilMoney" size="lg" />
            </div>
            <h5>Việc làm lương cao</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilGraph" size="lg" />
            </div>
            <h5>Việc làm từ xa</h5>
            <p>2879 việc làm</p>
          </el-card>
        </b-col>
        <b-col md="3">
          <el-card class="box-card" shadow="hover">
            <div class="icon-block mb-3">
              <CIcon class="" icon="cilMoodGood" size="lg" />
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
      </b-row> -->
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
                  <li
                    class="pb-1"
                    @click="goToFindJob(industry.id)"
                    v-for="industry in industryHotList.value &&
                    industryHotList.value.length > 0
                      ? industryHotList.value
                      : mainJobList"
                    :key="
                      industryHotList.value && industryHotList.value.length > 0
                        ? industry.id
                        : industry.value
                    "
                  >
                    <el-link>{{
                      industryHotList.value && industryHotList.value.length > 0
                        ? industry.name
                        : industry.label
                    }}</el-link>
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
                  <li
                    class="pb-1"
                    @click="goToFindJob('', place.value)"
                    v-for="place in workPlaceList"
                    :key="place.value"
                  >
                    <el-link>Việc làm {{ place.label }}</el-link>
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
                  <li
                    class="pb-1"
                    @click="goToFindJob(industry.id)"
                    v-for="industry in industryList.value &&
                    industryList.value.length > 0
                      ? industryList.value
                      : mainJobList"
                    :key="
                      industryList.value && industryList.value.length > 0
                        ? industry.id
                        : industry.value
                    "
                  >
                    <el-link
                      >Việc làm
                      {{
                        industryList.value && industryList.value.length > 0
                          ? industry.name
                          : industry.label
                      }}</el-link
                    >
                  </li>
                </ul>
              </b-col>
            </b-row>
          </el-card>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End Recommend type job -->

    <AppFooterLanding />
  </div>
</template>

<style lang="scss" scoped>
:deep .container-recommend {
  .el-card {
    background-color: aliceblue;
  }
  .el-card__body {
    height: 300px;
    overflow: auto;
  }
}
// :deep .container-recommend {
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
.urgent_recruitment_job,
.new_recruitment_job {
  .el-card .el-card {
    cursor: pointer;
    &:hover {
      border-color: lightblue;
    }
  }
}
:deep .container-discovery {
  .el-card {
    cursor: pointer;
    &:hover {
      background-color: lightskyblue;
    }
    .el-card__body {
      height: 205px;
    }
  }
}
.company_recruitment_block {
  .el-card {
    cursor: pointer;
  }
  .card__logo {
    width: auto;
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
:deep .urgent_recruitment_job {
  .card__logo {
    width: auto;
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
  .el-pagination {
    justify-content: center;
    .el-icon {
      margin-right: initial !important;
    }
  }
}
:deep .new_recruitment_job {
  .card__logo {
    width: auto;
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
  .el-pagination {
    justify-content: center;
    .el-icon {
      margin-right: initial !important;
    }
  }
}
</style>
