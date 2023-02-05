<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import PostApi from '@/moduleApi/modules/PostApi'
import IndustryApi from '@/moduleApi/modules/IndustryApi'

import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import AppFooterLanding from '@/components/AppFooterLanding.vue'
import Loading from '@/components/Loading.vue'

import { ElNotification, ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
import { computed, ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'

import modelData from '../Employer/RecruitmentPost/RecruitmentPostModel'

const moduleName = 'Find jobs'
const router = useRouter()
const workFormList = DataService.workFormList
const mainJobList = DataService.mainJobList
const secondJobList = DataService.secondJobList
const workPlaceList = DataService.workPlaceList
const experienceList = DataService.experienceList
const rankList = DataService.rankList
const certificateList = DataService.certificateList
const genderRequirementList = DataService.genderRequirementList
const industryList = reactive({ value: [] })

const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const validSearchForm = tableRules.dataSearch.valid

const count = ref(2)
const loading = ref(false)
const noMore = computed(() => count.value >= tableRules.total)
const disabled = computed(() => loading.value || noMore.value)

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 1
    tableRules.page += 1
    getPostList()
  }, 2000)
}

const goToJobDetail = () => {
  router.push({ name: 'Job detail' })
}

const backToPrev = () => {
  router.go(-1)
}

const handleAction = (action, id) => {
  if (action === 'save') {
    saveToCareList(id)
    const post = tableRules.data.find((o) => o.id === id)
    if (post) post.userCurrentSaved = true
  } else if (action === 'unSave') {
    unSaveFromCareList(id)
    const post = tableRules.data.find((o) => o.id === id)
    if (post) post.userCurrentSaved = false
  }
}

const saveToCareList = async (id) => {
  try {
    const res = await PostApi.saveToCare(id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Lưu tin tuyển dụng thành công.`,
      })
    }
  } catch (error) {
    ElMessage({
      message: 'Lưu tin tuyển dụng thất bại.',
      type: 'error',
    })
  }
}

const unSaveFromCareList = async (id) => {
  try {
    const res = await PostApi.removeSavePost(id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Bỏ lưu tin tuyển dụng thành công.`,
      })
    }
  } catch (error) {
    ElMessage({
      message: 'Bỏ lưu tin tuyển dụng thất bại.',
      type: 'error',
    })
  }
}

const getPostList = async () => {
  let dataFilter = {
    size: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    ...tableRules.filters,
  }
  router.replace({
    name: moduleName,
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const postApiRes = await PostApi.list(filter)
  if (postApiRes.status == 200) {
    const res = await changeData(postApiRes.data.data.data)
    tableRules.data = [...tableRules.data, ...res]
    tableRules.total = postApiRes.data.data.totalElements
    count.value = postApiRes.data.data.totalElements
    loading.value = false
  }
}

const changeData = (data) => {
  data.forEach((post) => {
    post.created = post.created
      ? MethodService.formatDate(post.created, 'date')
      : ''
    post.jobApplicationDeadlineFormat = post.jobApplicationDeadline
      ? MethodService.formatDate(post.jobApplicationDeadline, 'date')
      : ''
    post.salaryMinFormat = post.salaryMin
      ? MethodService.formatCurrency(post.salaryMin)
      : '---'
    post.salaryMaxFormat = post.salaryMax
      ? MethodService.formatCurrency(post.salaryMax)
      : '---'
  })
  return data
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        console.log('tableRules.filters', tableRules.filters)
        tableRules.data = []
        tableRules.skip = 0
        tableRules.page = 1
        await getPostList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getIndustryList = async () => {
  const industryApiRes = await IndustryApi.list('size=999999')
  if (industryApiRes.status == 200) {
    industryList.value = industryApiRes.data.data.data
  }
}

onMounted(async () => {
  await getIndustryList()
  await getPostList()
})
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />

    <!-- Start filter container -->
    <CContainer xxl class="mb-4">
      <div class="filter-container">
        <el-form
          ref="ruleFormRef"
          :model="formSearchData.value"
          :rules="validSearchForm"
          label-width="140px"
          label-position="top"
          class="demo-ruleForm"
          status-icon
        >
          <b-row>
            <b-col md="4">
              <el-form-item label=" " prop="">
                <el-input
                  v-model="formSearchData.value.title"
                  clearable
                  placeholder="Tìm kiếm việc làm"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </b-col>
            <b-col md="3">
              <el-form-item label=" " prop="">
                <el-select
                  v-model="formSearchData.value.industryId"
                  placeholder="Tất cả nghề nghiệp"
                  clearable
                >
                  <el-option
                    v-for="item in industryList.value"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </b-col>
            <b-col md="2">
              <el-form-item label=" " prop="">
                <el-select
                  v-model="formSearchData.value.recruitmentArea"
                  placeholder="Tỉnh thành"
                  clearable
                >
                  <el-option
                    v-for="item in workPlaceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </b-col>
            <b-col md="1">
              <el-form-item label=" " prop="">
                <el-button
                  type="primary"
                  @click="submitFormSearch(ruleFormRef)"
                >
                  Tìm kiếm
                </el-button>
              </el-form-item>
            </b-col>
            <b-col md="2">
              <el-form-item label=" " prop="">
                <el-button type="primary" plain @click="toggleSearchBox">
                  Tìm kiếm nâng cao
                </el-button>
              </el-form-item>
            </b-col>
          </b-row>

          <!-- Start Advanced search -->
          <b-collapse v-model="tableRules.showFormSearch">
            <el-card style="margin-right: 40px">
              <b-row>
                <b-col md="2">
                  <el-form-item label="Kinh nghiệm" prop="">
                    <el-select
                      v-model="formSearchData.value.recruitmentExperience"
                      placeholder="Tất cả kinh nghiệm"
                      clearable
                    >
                      <el-option
                        v-for="item in experienceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="2">
                  <el-form-item label="Mức lương tối thiểu" prop="">
                    <el-input
                      v-model="formSearchData.value.salaryMin"
                      placeholder="Tất cả mức lương"
                      clearable
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="2">
                  <el-form-item label="Mức lương tối đa" prop="salaryMax">
                    <el-input
                      v-model="formSearchData.value.salaryMax"
                      placeholder="Tất cả mức lương"
                      clearable
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="2">
                  <el-form-item label="Trình độ" prop="level">
                    <el-select
                      v-model="formSearchData.value.level"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in certificateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="2">
                  <el-form-item label="Hình thức làm việc" prop="">
                    <el-select
                      v-model="formSearchData.value.workForm"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in workFormList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="2">
                  <el-form-item
                    label="Yêu cầu giới tính"
                    prop="recruitmentGender"
                  >
                    <el-select
                      v-model="formSearchData.value.recruitmentGender"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in genderRequirementList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
              </b-row>
            </el-card>
          </b-collapse>
          <!-- End Advanced search -->
        </el-form>
      </div>
    </CContainer>
    <!-- End filter container -->

    <!-- Start Job hiring jobs -->
    <CContainer xxl class="mb-4">
      <h3 class="fw-bold mb-3">Kết quả tìm kiếm</h3>

      <el-empty
        v-if="!tableRules.data || tableRules.data.length === 0"
        description="Hiện không có công việc nào."
      />

      <div v-else class="infinite-list-wrapper left-side">
        <ul
          v-infinite-scroll="load"
          class="list"
          :infinite-scroll-disabled="disabled"
        >
          <li v-for="post in tableRules.data" :key="post.id" class="list-item">
            <el-card class="box-card" shadow="hover">
              <div class="d-flex align-items-start">
                <img
                  src="../../assets/images/logo-company/icons8-notion-256.png"
                  alt="logo-company"
                  class="card__logo"
                  @click="goToJobDetail"
                />
                <div class="d-flex justify-content-between w-100">
                  <div class="card__title" @click="goToJobDetail">
                    <p class="card__title-position mb-1 ms-2">
                      {{ post.title ? post.title : '' }}
                    </p>
                    <p class="card__title-company mb-1 ms-2">
                      {{
                        post.companyDTO && post.companyDTO.name
                          ? post.companyDTO.name
                          : 'Công ty Cổ Phần ABC'
                      }}
                    </p>
                    <div class="d-flex align-items-center ms-2">
                      <div
                        class="card__subtitle mb-0 d-flex align-items-center"
                      >
                        <el-icon><LocationInformation /></el-icon
                        ><span>{{ post.recruitmentArea }}</span>
                      </div>
                      <div
                        class="
                          card__subtitle
                          mb-0
                          mx-5
                          d-flex
                          align-items-center
                        "
                      >
                        <el-icon><Money /></el-icon>
                        <span>
                          {{
                            post.salaryMinFormat + ' - ' + post.salaryMaxFormat
                          }}
                        </span>
                      </div>
                      <div
                        class="card__subtitle mb-0 d-flex align-items-center"
                      >
                        <el-icon><Timer /></el-icon
                        ><span>{{ post.jobApplicationDeadlineFormat }}</span>
                      </div>
                    </div>
                  </div>
                  <CIcon
                    icon="cibMacys"
                    :class="{ 'c-turquoise': post.userCurrentSaved }"
                    @click="
                      handleAction(
                        `${post.userCurrentSaved ? 'unSave' : 'save'}`,
                        post.id,
                      )
                    "
                  />
                  <!-- <el-icon :class="{'c-turquoise': care}" @click="saveToCareList"><Star /></el-icon> -->
                </div>
              </div>
            </el-card>
          </li>
        </ul>

        <div
          v-if="loading"
          class="d-flex justify-content-center align-items-center mt-2"
        >
          <Loading class="me-2" />
          <p class="c-turquoise mb-0">Đang tải...</p>
        </div>
      </div>

      <div class="right-side"></div>
    </CContainer>
    <!-- End Job hiring jobs -->

    <!-- Start job info -->
    <CContainer xxl class="company__contact-info">
      <h3 class="fw-bold mb-3">Việc làm theo ngành nghề</h3>
      <b-row>
        <b-col md="4">
          <ul class="ps-2">
            <li
              class="pb-1"
              v-for="(job, i) in mainJobList"
              :key="job.value"
              :style="i > 6 ? 'display: none;' : ''"
            >
              <el-link>Việc làm {{ job.label }}</el-link>
            </li>
          </ul>
        </b-col>
        <b-col md="4">
          <ul class="ps-2">
            <li
              class="pb-1"
              v-for="(job, i) in mainJobList"
              :key="job.value"
              :style="i <= 6 || i > 13 ? 'display: none;' : ''"
            >
              <el-link>Việc làm {{ job.label }}</el-link>
            </li>
          </ul>
        </b-col>
        <b-col md="4">
          <ul class="ps-2">
            <li
              class="pb-1"
              v-for="(job, i) in mainJobList"
              :key="job.value"
              :style="i < 13 ? 'display: none;' : ''"
            >
              <el-link>Việc làm {{ job.label }}</el-link>
            </li>
          </ul>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End job info -->

    <AppFooterLanding />
  </div>
</template>

<style lang="scss" scoped>
.filter-container {
  padding: 15px 12px 8px 42px;
  border: 1px solid lightblue;
  border-radius: 10px;
  background-color: aliceblue;
}
:deep .infinite-list-wrapper {
  overflow: auto;
  max-height: 470px;
  margin: 20px 160px 0;
  padding: 0px 0px 5px 0px;
  border-top: 1px solid #bebebe;
  border-bottom: 1px solid #bebebe;
  .list {
    padding: 0;
    margin: 0;
    list-style: none;

    cursor: pointer;
    .list-item {
      &:nth-child(even) {
        .el-card {
          background: #f5f5f5;
        }
      }
      .card__logo {
        width: auto;
        height: 80px;
        border: 1px solid #dadada;
        border-radius: 4px;
      }
      .card__title-position {
        font-size: 16px;
        font-weight: 600;
      }
      .card__title-company {
        font-size: 13px;
        color: #76787a;
        font-weight: 600;
      }
      .card__subtitle {
        font-size: 13px;
        font-weight: 600;
      }
    }
    .el-card {
      border-radius: 0;
      height: 100%;
      &:hover {
        background: #d0e8f5 !important;
      }
      .el-card__body {
        padding: 12px !important;
        .card__item-content {
          font-size: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 22px;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          word-break: break-word;
          -webkit-box-orient: vertical;
        }
        .card__subtitle {
          font-size: 14px;
          margin-bottom: 0;
        }
      }
    }
  }
}
.company__contact-info {
  .card__subtitle {
    font-weight: 600;
    margin-bottom: 10px;
  }
}
</style>
