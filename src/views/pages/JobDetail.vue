<script setup>
import DataService from '@/service/DataService'

import { useRouter } from 'vue-router'
import AppHeaderLanding from '@/components/AppHeaderLanding.vue'

const router = useRouter()
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList

const backToPrev = () => {
  router.go(-1)
}
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />
  </div>
  </template>
