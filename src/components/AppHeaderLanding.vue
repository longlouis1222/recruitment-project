
<script setup>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import DataService from '@/service/DataService'

import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue-demi'

const router = useRouter()
const dialogAllIndustries = ref(false)
const mainJobList = DataService.mainJobList

const isShowAvatar = ref(false)

const toggleDialogAllIndustries = () => {
  dialogAllIndustries.value = true
}

const goToLogin = () => {
  router.push({ name: 'Login' })
}

const goToRegister = () => {
  router.push({ name: 'Register' })
}

const goToCreateCV = () => {
  router.push({ name: 'Hồ sơ ứng viên' })
}

const goToLandingPage = () => {
  router.push({ name: 'Landing page' })
}

onMounted(() => {
  localStorage.getItem('Token')
  // console.log(localStorage.getItem('Token'))
  if (localStorage.getItem('Token') && localStorage.getItem('uid')) {
    isShowAvatar.value = true
  }
})
</script>
<template>
  <CHeader position="sticky" class="mb-3 b-shadow">
    <CContainer fluid class="px-4">
      <!-- <CHeaderToggler class="ps-1">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler> -->
      <CHeaderBrand style="cursor: pointer" class="p-0" @click="goToLandingPage">
        <img src="/logo_R.png" alt="" style="width: 45px" />
        Recruitment
      </CHeaderBrand>
      <el-divider direction="vertical" />
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="#/employee/curriculum-vitae/curriculum-vitae-info"
            >Cơ hội việc làm</CNavLink
          >
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Hồ sơ</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Công ty</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav class="align-items-center">
        <CNavItem>
          <el-popover
            placement="bottom"
            title=""
            :width="200"
            trigger="click"
            content="Bạn không có thông báo mới nào."
          >
            <template #reference>
              <CIcon class="mx-2" icon="cil-bell" size="lg" />
            </template>
          </el-popover>
        </CNavItem>
        <CNavItem v-if="!isShowAvatar">
          <CNavLink @click="goToRegister">
            <el-button type="primary" plain @click="goToRegister"
              >Đăng ký</el-button
            >
          </CNavLink>
        </CNavItem>
        <CNavItem v-if="!isShowAvatar">
          <CNavLink click="goToLogin">
            <el-button type="primary" @click="goToLogin">Đăng nhập</el-button>
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt v-if="isShowAvatar" />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <CHeaderNav class="align-items-center">
        <CNavItem>
          <div @click="toggleDialogAllIndustries">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Tất cả các ngành"
              placement="bottom-start"
            >
              <CIcon style="cursor: pointer" class="mx-2" icon="cil-list" size="lg" />
            </el-tooltip>
          </div>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#"> Kinh doanh </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#"> Kế toán - Kiểm toán </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#"> Xây dựng </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#"> Bán hàng </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#"> Kỹ thuật </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav class="align-items-center">
        <CNavItem @click="goToCreateCV" style="cursor: pointer">
          <CNavLink
            class="d-flex align-items-center"
          >
            Tạo hồ sơ ngay <CIcon class="mx-2" icon="cilArrowRight" size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
  </CHeader>

  <el-dialog
    v-model="dialogAllIndustries"
    title="Danh sách ngành nghề"
    width="100%"
    top="5vh"
    class="dialog__industry"
    :close-on-click-modal="false"
  >
    <b-row>
      <b-col md="4" class="left__side">
        <p class="fw-bold">Top 10 ngành Hot</p>
        <el-divider></el-divider>
        <div class="d-flex flex-column align-items-start">
          <el-link
            class="mb-3"
            :underline="false"
            v-for="(industry, i) in mainJobList"
            :key="i"
            :style="i > 10 ? 'display: none' : ''"
          >
            {{ i < 11 ? industry.label : '' }}</el-link
          >
        </div>
      </b-col>
      <b-col md="8" class="right__side">
        <p class="fw-bold">Ngành khác</p>
        <el-divider></el-divider>
        <b-row>
          <b-col md="4">
            <div class="d-flex flex-column align-items-start">
              <el-link
                class="mb-3"
                :underline="false"
                v-for="(industry, i) in mainJobList"
                :key="i"
                :style="i > 10 ? 'display: none' : ''"
              >
                {{ i < 11 ? industry.label : '' }}</el-link
              >
            </div>
          </b-col>
          <b-col md="4">
            <div class="d-flex flex-column align-items-start">
              <el-link
                class="mb-3"
                :underline="false"
                v-for="(industry, i) in mainJobList"
                :key="i"
                :style="i > 10 ? 'display: none' : ''"
              >
                {{ i < 11 ? industry.label : '' }}</el-link
              >
            </div>
          </b-col>
          <b-col md="4">
            <div class="d-flex flex-column align-items-start">
              <el-link
                class="mb-3"
                :underline="false"
                v-for="(industry, i) in mainJobList"
                :key="i"
                :style="i > 10 ? 'display: none' : ''"
              >
                {{ i < 11 ? industry.label : '' }}</el-link
              >
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog__industry {
  margin-bottom: 0;
  height: calc(100vh - 35px);
  .left__side {
    border: 2px solid lightblue;
    border-radius: 8px;
    background-color: aliceblue;
    padding: 30px;
  }
  .right__side {
    padding: 30px;
  }
}
</style>
