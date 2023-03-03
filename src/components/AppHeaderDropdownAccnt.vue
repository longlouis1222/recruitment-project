<template>
  <!-- <CDropdown variant="nav-item"> -->
  <CDropdown>
    <CDropdownToggle placement="bottom-end" class="py-0 border-0" :caret="false">
      <CAvatar :src="userRole !== 'ADMIN' ? avatar : avatarAdmin" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <!-- <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-bell" /> Updates
        <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Tasks
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-comment-square" /> Comments
        <CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">

      </CDropdownHeader>
      <CDropdownItem class="cursor-pointer" @click="gotoUserProfile">
        <CIcon icon="cil-user" /> Thông tin cá nhân
      </CDropdownItem>
      <!-- <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem> -->
      <!-- <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <!-- <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <!-- <CDropdownDivider /> -->
      <!-- <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Lock Account
      </CDropdownItem> -->
      <CDropdownItem @click="logout" class="cursor-pointer">
        <CIcon icon="cilAccountLogout" /> Đăng xuất
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup>
import avatar from '@/assets/images/avatars/3.jpg'
import avatarAdmin from '@/assets/images/avatars/unknow_avt.png'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const userRole = localStorage.getItem('type')
const logout = () => {
  ElMessageBox.confirm(
    'Bạn có chắc muốn đăng xuất khỏi tài khoản này ?',
    'Cảnh báo',
    {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      type: 'warning',
    },
  )
    .then(() => {
      ElNotification({
        title: 'Success',
        message: 'Đang xuất thành công.',
        type: 'success',
        duration: 3000,
      })
      setTimeout(() => {
        store.dispatch('logout')
      }, 1500)
    })
    .catch(() => {})
}

const gotoUserProfile = () => {
  const accType = localStorage.getItem('type')
  if (accType == 'CANDIDATE') {
    router.push({ name: 'Tài khoản ứng viên' })
  } else router.push({ name: 'Thông tin nhà tuyển dụng' })
}
</script>
