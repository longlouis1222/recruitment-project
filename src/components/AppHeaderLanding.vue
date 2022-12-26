
<script setup>
import AppBreadcrumb from './AppBreadcrumb'
import { logo } from '@/assets/brand/logo'
</script>
<template>
  <CHeader position="sticky" class="mb-4 b-shadow">
    <CContainer fluid class="px-4">
      <!-- <CHeaderToggler class="ps-1">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler> -->
      <CHeaderBrand class="p-0" to="/pages/landing-page">
        <img src="/logo_R.png" alt="" style="width: 45px" />
        Recruitment
      </CHeaderBrand>
      <el-divider direction="vertical" />
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="#">Cơ hội việc làm</CNavLink>
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
          <CNavLink href="#">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Thông báo"
              placement="bottom-start"
            >
              <CIcon class="mx-2" icon="cil-bell" size="lg" />
            </el-tooltip>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <el-button type="primary" plain>Đăng ký</el-button>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <el-button type="primary">Đăng nhập</el-button>
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#" class="d-flex align-items-center">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Tất cả các ngành"
              placement="bottom-start"
            >
              <CIcon class="mx-2" icon="cil-list" size="lg" />
            </el-tooltip>
          </CNavLink>
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
        <CNavItem>
          <CNavLink href="#" class="d-flex align-items-center">
            Tạo hồ sơ ngay <CIcon class="mx-2" icon="cilArrowRight" size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>
