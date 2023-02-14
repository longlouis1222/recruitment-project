<script setup>
import DataService from '@/service/DataService'
import MethodService from '@/service/MethodService'

import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import AppFooterLanding from '@/components/AppFooterLanding.vue'
import Loading from '@/components/Loading.vue'

import CompanyApi from '@/moduleApi/modules/CompanyApi'
import PostApi from '@/moduleApi/modules/PostApi'
import IndustryApi from '@/moduleApi/modules/IndustryApi'

import { useRoute, useRouter } from 'vue-router'
import { computed, ref, reactive, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList

const companyInfo = ref(null)
const industryList = reactive({ value: [] })
const industryHotList = reactive({ value: [] })

const count = ref(10)
const offset = ref(0)
const size = ref(10)
const page = ref(0)
const recruitmentPostList = reactive({ value: [], total: 0 })
const loading = ref(false)
const noMore = computed(() => count.value >= recruitmentPostList.total)
const disabled = computed(() => loading.value || noMore.value)

const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 10
    offset.value += 10
    // page.value += 1
    recruitmentPostList.total += 10
  }, 2000)
  loading.value = false
}

const goToJobDetail = (id) => {
  router.push({ name: 'Job detail', params: { id: id } })
}

const backToPrev = () => {
  router.go(-1)
}

const getRecuitmentPostByCompany = async () => {
  const dataFilter = {
    companyId: route.params.id,
    limit: size.value,
    skip: offset.value,
    page: page.value > 0 ? page.value - 1 : page.value,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = await PostApi.list(filter)
  if (res.status) {
    page.value = offset.value / size.value + 1
    recruitmentPostList.value = [
      ...recruitmentPostList.value,
      ...res.data.data.data,
    ]
    recruitmentPostList.total = res.data.data.totalElements
  }
}

const getCompanyById = async () => {
  try {
    const res = await CompanyApi.findById(route.params.id)
    if (res.status === 200) {
      companyInfo.value = res.data.data
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const handleAction = (action, id) => {
  if (action === 'save') {
    saveToCareList(id)
    const post = tableRules.data.find((o) => o.id === id)
    if (post) post.userCurrentSaved = true
  } else if (action === 'unSave') {
    unSaveFromCareList(id)
    const post = tableRules.data.find((o) => o.id === id)
    if (post) post.userCurrentSaved = false
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

const fillData = () => {
  const businessIntroduction = document.getElementById('businessIntroduction')
  if (businessIntroduction) {
    businessIntroduction.innerHTML = companyInfo.value.businessIntroduction
  }
}

onMounted(async () => {
  await getHotIndustriesList()
  await getCompanyById()
  await fillData()
  await getRecuitmentPostByCompany()
})
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding
      :industryList="industryList.value"
      :industryHotList="industryHotList.value"
    />
    <!-- Start Header banner -->
    <div class="header__banner">
      <CContainer xxl class="pb-4">
        <img
          src="@/assets/images/banner/banner-home-pc-2.png"
          class="banner__company w-100"
          alt="banner-home-pc-2.png"
        />

        <div class="banner__company-info d-flex align-items-end">
          <img
            src="../../assets/images/logo-company/vecteezy_triangle_1200707.png"
            alt="logo-company"
            class="card__logo"
          />
          <div class="ms-3 mb-3">
            <p class="card__title-company mb-1">
              {{
                companyInfo && companyInfo.name
                  ? companyInfo.name
                  : 'Công ty Cổ Phần Phần mềm LL'
              }}
            </p>
            <div class="d-flex">
              <div class="d-flex align-items-center me-4">
                <el-icon class="text-info"><Location /></el-icon
                ><span class="card__subtitle">{{
                  companyInfo && companyInfo.companyAddress
                    ? companyInfo.companyAddress
                    : 'Số 86 Mễ Trì Hạ, Nam Từ Liêm, Hà Nội'
                }}</span>
              </div>
              <div class="d-flex align-items-center">
                <el-icon class="text-info"><PhoneFilled /></el-icon
                ><span class="card__subtitle">{{
                  companyInfo && companyInfo.companyPhoneNumber
                    ? companyInfo.companyPhoneNumber
                    : '0926676969'
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </CContainer>
    </div>
    <!-- End Header banner -->

    <!-- Start Body banner -->
    <div class="container_banner py-4">
      <!-- Start Job hiring jobs -->
      <CContainer xxl class="mb-4">
        <h3 class="fw-bold mb-3" style="margin-left: 160px">
          Vị trí đang tuyển
        </h3>

        <div class="infinite-list-wrapper">
          <ul
            v-infinite-scroll="load"
            class="list"
            :infinite-scroll-disabled="disabled"
          >
            <li
              v-for="post in recruitmentPostList.value"
              :key="post.id"
              class="list-item"
            >
              <el-card
                class="box-card"
                shadow="hover"
                @click="goToJobDetail(post.id)"
              >
                <div class="d-flex justify-content-between w-100">
                  <p class="card__item-content mb-2">
                    {{ post.title ? post.title : 'Vị trí tuyển dụng' }}
                  </p>
                  <CIcon
                    icon="cibMacys"
                    :class="{ 'c-turquoise': post.userCurrentSaved }"
                    @click="
                      handleAction(
                        `${post.userCurrentSaved ? 'unSave' : 'save'}`,
                        post.id,
                      )
                    "
                  />
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="card__subtitle me-5 d-flex">
                      <el-icon :size="18"><Money /></el-icon>
                      <span class="text-black-50 me-1">Lương:</span>
                      <span>{{
                        MethodService.formatCurrencyShort(post.salaryMin) +
                        ' - ' +
                        MethodService.formatCurrencyShort(post.salaryMax)
                      }}</span>
                    </div>
                    <div class="card__subtitle mx-5 d-flex">
                      <el-icon :size="18"><Location /></el-icon>
                      <span class="text-black-50 me-1">Nơi làm việc:</span>
                      <span>{{ post.workplace }}</span>
                    </div>
                    <div class="card__subtitle ms-5 d-flex">
                      <el-icon :size="18"><AlarmClock /></el-icon>
                      <span class="text-black-50 me-1">Hạn nộp:</span>
                      <span>{{
                        MethodService.formatDate(
                          post.jobApplicationDeadline,
                          'date',
                        )
                      }}</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </li>
          </ul>

          <div
            v-if="loading"
            class="d-flex justify-content-center align-items-center mt-2"
          >
            <Loading class="me-2" />
            <p class="c-turquoise mb-0">Đang tải...</p>
          </div>
        </div>
      </CContainer>
      <!-- End Job hiring jobs -->

      <!-- Start company info -->
      <CContainer xxl class="company__introduction mb-4">
        <h3 class="fw-bold mb-3" style="margin-left: 160px">
          Giới thiệu về công ty
        </h3>
        <div class="card__subtitle" style="margin-left: 160px">
          <span id="businessIntroduction">{{
            companyInfo && companyInfo.businessIntroduction
              ? companyInfo.businessIntroduction
              : 'Không có dữ liệu.'
          }}</span>
        </div>
      </CContainer>
      <!-- End company info -->

      <!-- Start company contact info -->
      <CContainer xxl class="company__contact-info">
        <h3 class="fw-bold mb-3" style="margin-left: 160px">Liên hệ</h3>
        <div class="card__subtitle d-flex" style="margin-left: 160px">
          <el-icon :size="18" class="text-info"><Location /></el-icon>
          <span class="text-black-50 me-1">Địa chỉ:</span>
          <span>{{
            companyInfo && companyInfo.companyAddress
              ? companyInfo.companyAddress
              : 'Số 18 Lũy Bán Bích, Phường Tân Thới Hòa, Quận Tân Phú, TP.HCM'
          }}</span>
        </div>
        <div class="card__subtitle d-flex">
          <el-icon :size="18"><Avatar /></el-icon>
          <span class="text-black-50 me-1">Quy mô:</span>
          <span
            >{{
              companyInfo && companyInfo.employeeNumber
                ? companyInfo.employeeNumber + ' người'
                : '200 Người'
            }}
          </span>
        </div>
        <div class="card__subtitle d-flex">
          <el-icon :size="18" class="text-warning"><Briefcase /></el-icon>
          <span class="text-black-50 me-1">Lĩnh vực:</span>
          <span>{{
            companyInfo && companyInfo.fieldOfActivity
              ? companyInfo.fieldOfActivity
              : 'IT Phần mềm'
          }}</span>
        </div>
      </CContainer>
      <!-- End company contact info -->
      <CContainer xxl class="mt-3 mb-4">
        <div
          class="d-flex align-items-center mt-4 mb-4"
          style="margin-left: 160px"
          @click="backToPrev"
        >
          <el-link :underline="false"
            ><el-icon class="mt-1"><Back /></el-icon
            ><span>Quay lại</span></el-link
          >
        </div>
      </CContainer>
    </div>
    <!-- End Body banner -->
    <AppFooterLanding />
  </div>
</template>

<style lang="scss" scoped>
.header__banner {
  width: 100%;
  height: 15%;
  background: #fff;
  .banner__company {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .banner__company-info {
    margin-top: -20px;
    margin-left: 155px;
    .card__logo {
      width: auto;
      height: 120px;
      border-radius: 15px;
      box-shadow: 0px 2px 3px 0px #bebebe;
      background: #fff;
    }
    .card__title-company {
      font-size: 22px;
      color: #000;
      font-weight: 700;
    }
    .card__subtitle {
      font-weight: 600;
    }
  }
}
.container_banner {
  background: #fafaff;

  .infinite-list-wrapper {
    overflow: auto;
    max-height: 470px;
    margin: 20px 160px 0;
    padding: 0px 0px 5px 0px;
    border-top: 1px solid #bebebe;
    border-bottom: 1px solid #bebebe;
    .list {
      padding: 0;
      margin: 0;
      list-style: none;

      cursor: pointer;
      .list-item {
        &:nth-child(even) {
          .el-card {
            background: #f5f5f5;
          }
        }
      }
      .el-card {
        border-radius: 0;
        height: 100%;

        &:hover {
          background: #d0e8f5 !important;
        }
        .el-card__body {
          .card__item-content {
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 22px;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            word-break: break-word;
            -webkit-box-orient: vertical;
          }
          .card__subtitle {
            font-size: 14px;
            margin-bottom: 0;
          }
        }
      }
    }
  }

  :deep .company__introduction {
    .card__subtitle {
      font-weight: 600;
      margin-bottom: 10px;
      margin-left: 160px;
    }
    ul li {
      list-style: initial;
      margin-bottom: 8px;
    }
  }
  .company__contact-info {
    .card__subtitle {
      font-weight: 600;
      margin-bottom: 10px;
      margin-left: 160px;
    }
  }
}
</style>
