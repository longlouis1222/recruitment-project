<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <!-- <CIcon :icon="logo" height="48" alt="Logo" /> -->
        <img src="/logo_R.png" alt="" style="width: 60px" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="/">Trang chủ</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav class="align-items-center">
        <CNavItem>
          <el-popover
            placement="bottom"
            title=""
            :width="160"
            trigger="click"
            content="Bạn không có thông báo mới nào."
          >
            <template #reference>
              <CIcon class="mx-2" icon="cil-bell" size="lg" />
            </template>
          </el-popover>
        </CNavItem>
        <!-- <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem> -->
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>
