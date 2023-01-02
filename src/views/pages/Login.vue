<script setup>
import ValidService from '@/service/ValidService'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import { CRow } from '@coreui/vue'
import { FormInstance } from 'element-plus'

const router = useRouter()
const store = useStore()

const ruleFormRef = ref(FormInstance)
const formData = reactive({ value: { username: null, password: null } })
const validForm = reactive({
  username: [ValidService.required],
  password: [ValidService.required],
})

const login = async (formEl) => {
  console.log('zoos')
  formEl.validate(async (valid) => {
    if (!valid) {
      return
    }
    try {
      console.log(
        'Username / password',
        formData.value.username,
        formData.value.password,
      )
      console.log('Login func from Login Component')
      store.dispatch('login', {
        username: formData.value.username,
        password: formData.value.password,
      })
    } catch (error) {
      // ElNotification({
      //   title: 'Error',
      //   message: `${e}`,
      //   type: 'error',
      //   duration: 3000,
      // })
    }
  })
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
  <div
    class="bg-light min-vh-100 d-flex flex-row align-items-center slider-wrap"
  >
    <CContainer>
      <CRow class="">
        <CCol :md="5">
          <CCardGroup class="b-shadow">
            <CCard class="p-4">
              <CCardBody class="py-0">
                <!-- <CForm> -->
                  <div class="text-right">
                    <CButton
                      color="link"
                      class="px-0"
                      style="font-size: 13px"
                      @click="goToSignUp"
                    >
                      Đăng ký
                    </CButton>
                  </div>
                  <h1>Đăng nhập</h1>
                  <p class="text-medium-emphasis">
                    Chào bạn đến với nền tảng tuyển dụng nhân sự
                  </p>
                  <!-- <CInputGroup class="mb-3">
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
                  </CInputGroup> -->

                  <el-form
                    ref="ruleFormRef"
                    :model="formData.value"
                    :rules="validForm"
                    label-width="0px"
                    label-position="left"
                    class="demo-ruleForm mt-2 mb-4"
                    status-icon
                    @submit.prevent="login(ruleFormRef)"
                  >
                    <b-row>
                      <b-col md="12">
                        <el-form-item label="" prop="username">
                          <el-input
                            v-model="formData.value.username"
                            size="large"
                            placeholder="Tài khoản đăng nhập"
                          >
                            <template #prefix>
                              <el-icon class="el-input__icon"
                                ><UserFilled
                              /></el-icon>
                            </template>
                          </el-input>
                        </el-form-item>
                      </b-col>
                      <b-col md="12">
                        <el-form-item label="" prop="password">
                          <el-input
                            v-model="formData.value.password"
                            type="password"
                            size="large"
                            show-password
                            placeholder="Mật khẩu"
                          >
                            <template #prefix>
                              <el-icon class="el-input__icon"><Lock /></el-icon>
                            </template>
                          </el-input>
                        </el-form-item>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <el-button type="primary" @click="login(ruleFormRef)"
                          >Đăng nhập</el-button
                        >
                      </b-col>
                      <b-col md="6" class="text-right">
                        <CButton
                          color="link"
                          class="px-0"
                          @click="goToForgotPassword"
                        >
                          Quên mật khẩu?
                        </CButton>
                      </b-col>
                    </b-row>
                  </el-form>
                <!-- </CForm> -->
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<style lang="scss" scoped>
.slider-wrap {
  animation: para 350s linear infinite;
  background-image: url('@/assets/images/bgc-wrap.jpg');
  background-size: cover;
}

@keyframes para {
  100% {
    background-position: -5000px 20%, -800px 95%, 500px 50%, 1000px 100%,
      400px 0;
  }
}
.b-shadow {
  box-shadow: 0 0 4px 0px #515151;
  border-radius: 4px;
}
</style>
