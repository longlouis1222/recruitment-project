<script setup>
import ValidService from '../../service/ValidService'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'


const router = useRouter()
const store = useStore()

const ruleFormRef = ref(FormInstance)
const loadingBtn = ref(false)

const isVerifyAccount = ref(false)

const typeList = [
  {
    label: 'Nhà tuyển dụng',
    value: 'EMPLOYER'
  },
  {
    label: 'Ứng viên',
    value: 'CANDIDATE'
  },
]

const dataForm = reactive({
  value: {
    type: null,
    email: null,
    username: null,
    password: null,
    repeatPassword: null,
  },
})
// validate form
const validatePass = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('Vui lòng nhập mật khẩu'))
  } else if (value.length < 6) {
    callback(new Error('Mật khẩu dài ít nhất 6 ký tự'))
  } else if (value.includes(dataForm.value.newPassword)) {
    callback(new Error('Mật khẩu không được chứa tên tài khoản'))
  } else {
    callback()
  }
}
const validatePassCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Vui lòng nhập lại mật khẩu'))
  } else if (value && value !== dataForm.value.password) {
    callback(new Error('Nhập lại mật khẩu chưa trùng khớp với mật khẩu mới'))
  } else {
    callback()
  }
}
const rulesForm = reactive({
  type: [ValidService.requiredChange],
  email: [ValidService.required, ValidService.checkEmail],
  username: [ValidService.required],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  repeatPassword: [
    { required: true, validator: validatePassCheck, trigger: 'blur' },
  ],
})

const signUp = async (formEl) => {
  loadingBtn.value = true;
  formEl.validate(async (valid) => {
    if (!valid) {
      loadingBtn.value = false;
      return;
    }
    try {
      const data = {
        type: dataForm.value.type,
        email: dataForm.value.email,
        username: dataForm.value.username,
        password: dataForm.value.password,
        confirmPassword: dataForm.value.repeatPassword,
      }
      console.log('>>>data', data)
      console.log('Login func from Register Component')
      store.dispatch('register', data)

      isVerifyAccount.value = true
    } catch (error) {
      ElNotification({
        title: 'Error',
        message: `${e}`,
        type: 'error',
        duration: 3000,
      })
    } finally {
        setTimeout(() => {
          loadingBtn.value = false
        }, 1500)
      }
  });
}

const backToPrev = () => {
  isVerifyAccount.value = false
}

const backToLogin = () => {
  router.push({ name: 'Login' })
}

onMounted(() => {
  setTimeout(() => {
    dataForm.value.username = null
    dataForm.value.password = null
  }, 2000)
})
</script>

<template>
  <div
    class="bg-light min-vh-100 d-flex flex-row align-items-center slider-wrap"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody v-if="!isVerifyAccount" class="p-4 b-shadow">
              <h1 class="text-center">Đăng ký</h1>
              <p class="text-medium-emphasis text-center">
                Tạo tài khoản cá nhân
              </p>
              <el-form
                ref="ruleFormRef"
                :model="dataForm.value"
                status-icon
                :rules="rulesForm"
                label-width="150px"
                label-position="top"
                @submit.prevent
              >
                <el-form-item label="Vai trò" prop="type">
                  <el-select
                    v-model="dataForm.value.type"
                    placeholder="Chọn"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                  <el-input
                    type="text"
                    v-model="dataForm.value.email"
                    autocomplete="off"
                    placeholder="abc@gmail.com"
                  />
                </el-form-item>
                <el-form-item label="Tên người dùng" prop="username">
                  <el-input
                    type="text"
                    v-model="dataForm.value.username"
                    autocomplete="off"
                    placeholder="abc"
                  />
                </el-form-item>
                <el-form-item label="Mật khẩu" prop="password">
                  <el-input
                    type="password"
                    v-model="dataForm.value.password"
                    show-password
                    autocomplete="off"
                  />
                </el-form-item>
                <el-form-item label="Xác nhận mật khẩu" prop="repeatPassword">
                  <el-input
                    type="password"
                    v-model="dataForm.value.repeatPassword"
                    show-password
                    autocomplete="off"
                    placeholder=""
                  />
                </el-form-item>
                <div class="d-flex justify-content-between">
                  <el-form-item class="mb-0 w-48">
                    <el-button
                      type="button"
                      style="height: 36px"
                      class="btn btn-success w-100 mt-2"
                      @click="router.go(-1)"
                      native-type="submit"
                    >
                      Quay lại
                    </el-button>
                  </el-form-item>
                  <el-form-item class="mb-0 w-48">
                    <el-button
                      type="primary"
                      style="height: 36px"
                      class="btn btn-success btn-load w-100 mt-2"
                      @click="signUp(ruleFormRef)"
                      native-type="submit"
                      :loading="loadingBtn"
                    >
                      Gửi
                    </el-button>
                  </el-form-item>
                </div>
              </el-form>
            </CCardBody>
            <!-- StartNotification check mail -->
            <div v-else class="card-body p-3 b-shadow">
              <div class="mt-2 text-center">
                <h5 class="text-center">Kích hoạt tài khoản</h5>
                <img
                  class="w-75"
                  src="../../../src/assets/gifs/check-mail.gif"
                  alt="mail..."
                />
                <p class="active text-center">
                  Mã xác thực vào tài khoản email mà bạn đã đăng ký.
                  <br />
                  Hãy kiểm tra email và làm theo hướng dẫn.
                </p>
                <div class="text-center w-100" style="font-size: 11px">
                  Chưa nhận được mã xác thực?
                  <a @click="backToPrev" style="color: #409eff; cursor: pointer"
                    >Đăng ký lại</a
                  >
                  hoặc
                  <a
                    style="color: #409eff; cursor: pointer"
                    @click="backToLogin"
                    >Quay lại màn đăng nhập</a
                  >
                </div>
              </div>
            </div>
            <!-- Notification check mail -->
          </CCard>
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
