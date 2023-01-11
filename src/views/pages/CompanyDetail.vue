<script setup>
import DataService from '@/service/DataService'

import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import AppFooterLanding from '@/components/AppFooterLanding.vue'
import Loading from '@/components/Loading.vue'

import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList

const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)

const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 2000)
}

const goToJobDetail = () => {
  router.push({ name: 'Job detail' })
}

const backToPrev = () => {
  router.go(-1)
}
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />
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
            <p class="card__title-company mb-1">Công ty Cổ Phần Phần mềm LL</p>
            <span class="card__subtitle"
              ><el-icon class="text-info"><Location /></el-icon>Hà Nội</span
            >
            <span class="card__subtitle ms-5">
              <el-icon class="text-info"><PhoneFilled /></el-icon>0926676969</span
            >
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
            <li v-for="i in count" :key="i" class="list-item">
              <el-card class="box-card" shadow="hover" @click="goToJobDetail">
                <p class="card__item-content mb-2">Front-end developer</p>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="card__subtitle me-5">
                      <span class="text-black-50 me-1"
                        ><el-icon :size="18"><Money /></el-icon>Lương:</span
                      >
                      <span>10 - 20 triệu</span>
                    </div>
                    <div class="card__subtitle mx-5">
                      <span class="text-black-50 me-1"
                        ><el-icon :size="18"><Location /></el-icon>Nơi làm
                        việc:</span
                      >
                      <span>Hà Nội</span>
                    </div>
                    <div class="card__subtitle ms-5">
                      <span class="text-black-50 me-1"
                        ><el-icon :size="18"><AlarmClock /></el-icon>Hạn
                        nộp:</span
                      >
                      <span>05/03/2022</span>
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

      <!-- Start company contact info -->
      <CContainer xxl class="company__contact-info">
        <h3 class="fw-bold mb-3">Liên hệ</h3>
        <div class="card__subtitle">
          <span class="text-black-50 me-1"
            ><el-icon :size="18"><Location /></el-icon>Địa chỉ:</span
          >
          <span>số 18 Lũy Bán Bích, Phường Tân Thới Hòa, Quận Tân Phú, TP.HCM</span>
        </div>
        <div class="card__subtitle">
          <span class="text-black-50 me-1"
            ><el-icon :size="18"><Avatar /></el-icon>Quy mô:</span
          >
          <span>200 Người</span>
        </div>
        <div class="card__subtitle">
          <span class="text-black-50 me-1"
            ><el-icon :size="18"><Briefcase /></el-icon>Lĩnh vực:</span
          >
          <span>IT Phần mềm</span>
        </div>
      </CContainer>
      <!-- End company contact info -->
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
      // font-size: 16px;
      font-weight: 600;
    }
  }
}
.container_banner {
  background: #fafaff;

  .infinite-list-wrapper {
    overflow: auto;
    height: 470px;
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
  .company__contact-info {
    margin-left: 160px;
    .card__subtitle {
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
}
</style>
