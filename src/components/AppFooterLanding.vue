<template>
  <div class="footer">
    <CContainer xl class="mt-4">
      <b-row>
        <b-col md="6">
          <h5 class="mb-4">Hotline cho <span class="fw-bold">Nhà tuyển dụng</span></h5>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <el-icon class="footer__icon"><Headset /></el-icon>
              <div class="ms-3">
                <p class="mb-1">Hotline hỗ trợ miền Bắc</p>
                <p class="fw-bold">HN: (024) 2567 6969</p>
              </div>
            </div>
            <el-divider direction="vertical" class="mx-3 divider-hotline" />
            <div class="d-flex align-items-center">
              <el-icon class="footer__icon"><Headset /></el-icon>
              <div class="ms-3">
                <p class="mb-1">Hotline hỗ trợ miền Nam</p>
                <p class="fw-bold">HCM: (0248) 2667 6969</p>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <h5 class="mb-4">Hotline cho <span class="fw-bold">Người tìm việc</span></h5>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <el-icon class="footer__icon"><Headset /></el-icon>
              <div class="ms-3">
                <p class="mb-1">Hotline hỗ trợ miền Bắc</p>
                <p class="fw-bold">HN: (024) 2567 6969</p>
              </div>
            </div>
            <el-divider direction="vertical" class="mx-3 divider-hotline" />
            <div class="d-flex align-items-center">
              <el-icon class="footer__icon"><Headset /></el-icon>
              <div class="ms-3">
                <p class="mb-1">Hotline hỗ trợ miền Nam</p>
                <p class="fw-bold">HCM: (0248) 2667 6969</p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <el-divider />
      <b-row>
        <b-col md="6">
          <p>Về chúng tôi</p>
          <p class="small">Recuitment.vn - Công Ty Cổ Phần Việc Làm</p>
          <p class="small fw-lighter">
            Trụ sở: Tòa nhà Siêu Việt, 23 Trần Cao Vân, Phường Đa Kao, Quận 1,
            TP Hồ Chí Minh
          </p>
          <p class="small fw-lighter">
            Chi nhánh: Tầng 12A, Tòa nhà Center Building, Số 1 Nguyễn Huy Tưởng,
            Quận Thanh Xuân, Hà Nội.
          </p>
          <p class="small fw-lighter">
            Giấy phép hoạt động dịch vụ việc làm số: 4938/SLĐTBXH-GP do Sở Lao
            Động Thương Binh & Xã Hội TP.HCM cấp
          </p>
          <p class="small fw-lighter">
            Điện thoại:(024) 2567 6969
            <el-divider direction="vertical" class="mx-1" /> (0248) 2667 6969
          </p>
          <p class="small fw-lighter">
            Email hỗ trợ người tìm việc: longnguyenhuy1402@gmail.com
          </p>
          <p class="small fw-lighter">
            Email hỗ trợ nhà tuyển dụng: longnguyenhuy1402@gmail.com
          </p>
        </b-col>
        <b-col md="3">
          <p>Thông tin</p>
          <p><el-link class="small">Cẩm nang nghề nghiệp</el-link></p>
          <p><el-link class="small">Báo giá dịch vụ</el-link></p>
          <p><el-link class="small">Điều khoản sử dụng</el-link></p>
          <p><el-link class="small">Quy định bảo mật</el-link></p>
          <p><el-link class="small">Sơ đồ web</el-link></p>
        </b-col>
        <b-col md="3">
          <p>Kết nối với chúng tôi</p>
          <div>
            <CIcon class="mx-2" icon="cibFacebook" size="lg" />
            <CIcon class="mx-2" icon="cibYoutube" size="lg" />
          </div>
        </b-col>
      </b-row>
      <el-divider />
      <b-row>
        <b-col md="12">
          <img src="/logo_R.png" alt="" style="width: 35px" />
          <span class="small ms-1"
            >@ 2023 - Bản quyền thuộc về Nguyễn Huy Long</span
          >
        </b-col>
      </b-row>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'AppFooterLanding',
}
</script>

<style lang="scss" scoped>
.footer {
  .footer__icon {
    font-size: 40px;
  }
  .divider-hotline.el-divider--vertical {
    width: 2px;
    height: 3em;
    // border-color: black;
  }
}
</style>
