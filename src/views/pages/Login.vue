<script setup>
// import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { CRow } from '@coreui/vue';
const router = useRouter()
const store = useStore()

const username = ref('')
const password = ref('')

const login = () => {
  console.log('Username / password', username.value, password.value)
  console.log('Login func from Login Component')
  store.dispatch('login', { username: username.value, password: password.value })

  // store.commit('setUser', 'Long Louis')
}

const goToSignUp = () => {
  router.push({
    name: 'Register',
  })
}

const goToForgotPassword = () => {
  router.push({
    name: 'ForgotPassword',
  })
}
</script>

<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center slider-wrap">
    <CContainer>
      <CRow class="">
        <CCol :md="5">
          <CCardGroup class="b-shadow">
            <CCard class="p-4">
              <CCardBody class="pt-0">
                <CForm>
                  <div class="text-right">
                      <CButton
                          color="link"
                          class="px-0"
                          style="font-size: 13px;"
                          @click="goToSignUp"
                        >
                          Đăng ký
                        </CButton>
                    </div>
                  <h1>Đăng nhập</h1>
                  <p class="text-medium-emphasis">Chào bạn đến với nền tảng tuyển dụng nhân sự</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="username"
                      placeholder="Username"
                      autocomplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <el-button type="primary" @click="login">Đăng nhập</el-button>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton
                        color="link"
                        class="px-0"
                        @click="goToForgotPassword"
                      >
                        Quên mật khẩu?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2 class="mb-4">Đăng ký</h2>
                  <h5>
                    Bạn chưa có tài khoản ?
                  </h5>
                  <p>
                    Đăng ký ngay để có thể tra cứu thông tin việc làm một cách nhanh nhất
                    và tuyển dụng được nhân sự chất lượng.
                  </p>
                  <CButton
                    color="light"
                    variant="outline"
                    class="mt-3"
                    @click="goToSignUp"
                  >
                    Đăng ký ngay!
                  </CButton>
                </div>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<style lang="scss" scoped>
.slider-wrap {
  animation: para 350s linear infinite;
  background-image: url("@/assets/images/bgc-wrap.jpg");
  background-size: cover;
}

@keyframes para {
  100% {
    background-position:
      -5000px 20%,
      -800px 95%,
      500px 50%,
      1000px 100%,
      400px 0;
    }
  }
.b-shadow {
  box-shadow: 0 0 4px 0px #515151;
  border-radius: 4px;
}
</style>
