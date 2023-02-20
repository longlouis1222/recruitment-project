import { createStore } from 'vuex'
import AuthService from '../moduleApi/modules/auth'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router/index'
import { ElMessage } from 'element-plus'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    user: null,
  },
  getters: {
    currentUser(state) {
      return state.user
    },
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    SET_CURRENT_USER(state, payload) {
      console.log('From Mutation')
      state.user = payload
      console.log('User state change: ', state.user)
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const res = await AuthService.login(credentials)
        if (res.status == 200 && res.data) {
          const userInfo = VueJwtDecode.decode(res.data.token)
          commit('SET_CURRENT_USER', userInfo)
          localStorage.setItem('Token', res.data.token)
          localStorage.setItem('uid', userInfo.uid)
          localStorage.setItem('type', userInfo.type)
          if (userInfo.type !== 'CANDIDATE' && userInfo.type !== 'EMPLOYER') {
            router.push({ name: 'Danh sách người dùng' })
          } else router.push({ name: 'Trang chủ' })
        }
      } catch (error) {
        console.log(error)
        if (error) {
          ElMessage({
            message: 'Tài khoản đăng nhập không hợp lệ.',
            type: 'error',
          })
        }
      }
    },

    async logout({ commit }) {
      try {
        localStorage.removeItem('Token')
        localStorage.removeItem('uid')
        localStorage.removeItem('type')
        commit('SET_CURRENT_USER', null)
        router.push({ name: 'Login' })
      } catch (error) {
        console.log(error)
      }
    },

    async register({ commit }, credentials) {
      try {
        const res = await AuthService.register(credentials)
        if (res.status === 200) {
          // router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
        ElMessage({
          message: 'Có lỗi xảy ra lỗi khi đăng ký tài khoản.',
          type: 'error',
        })
      }
    },

    async forgotPassword({ commit }, credentials) {
      try {
        const res = await AuthService.forgotPassword(credentials)
        if (res.status === 200) {
        }
      } catch (error) {
        console.log(error)
        ElMessage({
          message: 'Có lỗi xảy ra khi gửi mail xác nhận.',
          type: 'error',
        })
      }
    },

    async updatePassword({ commit }, credentials) {
      try {
        const res = await AuthService.updatePassword(credentials)
        if (res.status === 200) {
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
        ElMessage({
          message: 'Có lỗi xảy ra khi thay đổi mật khẩu.',
          type: 'error',
        })
      }
    },

    async activeAccount({ commit }, credentials) {
      try {
        const res = await AuthService.activeAccount(credentials)
        if (res.status === 200) {
          // router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
        ElMessage({
          message: 'Có lỗi xảy ra khi kích hoạt tài khoản.',
          type: 'error',
        })
      }
    },
  },
  modules: {},
  // modules,
})
