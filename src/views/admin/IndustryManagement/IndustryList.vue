<script setup>
import MethodService from '@/service/MethodService'

import IndustryApi from '@/moduleApi/modules/IndustryApi'

import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

import modelData from './IndustryModel'

const router = useRouter()

const ruleFormRef = ref(FormInstance)
const ruleFormRefSearch = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm
const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const formSearchValid = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.valid),
})

const dialogIndustry = ref(false)
const viewMode = ref('create')

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

const openDialogAddIndustry = () => {
  dialogIndustry.value = true
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (viewMode.value === 'create') {
          const industryApiRes = await IndustryApi.create(formData.value)
          if (industryApiRes.status === 200) {
            ElNotification({
              title: 'Success',
              message: 'Thêm mới thành công.',
              type: 'success',
              duration: 3000,
            })
          }
        } else if (viewMode.value === 'update') {
          const industryApiRes = await IndustryApi.update(formData.value)
          if (industryApiRes.status === 200) {
            ElNotification({
              title: 'Success',
              message: 'Cập nhật thành công.',
              type: 'success',
              duration: 3000,
            })
          }
        }
        dialogIndustry.value = false
        viewMode.value = 'create'
        await resetForm()
        await getIndustryList()
      } catch (error) {
        console.log(error)
        ElNotification({
          title: 'Error',
          message: 'Cập nhật thất bại.',
          type: 'error',
          duration: 3000,
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        tableRules.skip = 0
        tableRules.page = 1
        getIndustryList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const getIndustryList = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    // sort: tableRules.sort,
    ...tableRules.filters,
  }
  router.replace({
    name: 'Danh sách ngành nghề',
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const industryApiRes = await IndustryApi.list(filter)
  if (industryApiRes.status === 200) {
    tableRules.data = industryApiRes.data.data.data
    tableRules.total = industryApiRes.data.data.totalElements
  }
}

const handleAction = async (action, rowData) => {
  viewMode.value = action
  if (action === 'update') {
    await getIndustryById(rowData)
    dialogIndustry.value = true
  } else if (action === 'delete') {
    deleteIndustry(rowData)
  }
}

const getIndustryById = async (rowData) => {
  try {
    const industryApiRes = await IndustryApi.findById(rowData.id)
    if (industryApiRes.status === 200) {
      formData.value = { ...industryApiRes.data.data }
    }
  } catch (error) {
    ElMessage({
      message: 'Có lỗi khi tải dữ liệu.',
      type: 'error',
    })
  }
}

const deleteIndustry = async (rowData) => {
  ElMessageBox.confirm('Bạn có chắc muốn xóa ngành nghề này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
    type: 'warning',
  })
    .then(async () => {
      const industryApiRes = await IndustryApi.delete(rowData.id)
      if (industryApiRes.status === 200) {
        await getIndustryList()
        ElNotification({
          title: 'Success',
          message: 'Xóa thành công.',
          type: 'success',
          duration: 3000,
        })
      }
    })
    .catch(() => {})
}

const fn_tableSizeChange = (limit) => {
  tableRules.limit = limit
  fn_tableChangeOffset(1)
}
const fn_tableCurentChange = (page) => {
  fn_tableChangeOffset(page)
}
const fn_tablePrevClick = () => {
  // fn_tableChangeOffset(page);
}
const fn_tableNextClick = () => {
  // fn_tableChangeOffset(page);
}
const fn_tableChangeOffset = (page) => {
  tableRules.page = page
  tableRules.skip = (tableRules.page - 1) * tableRules.limit
  getIndustryList()
}

onMounted(async () => {
  await getIndustryList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách ngành nghề</h4>
            <div>
              <el-button type="primary" @click="toggleSearchBox">
                <el-icon class="me-2"><Search /></el-icon>
                Ẩn/hiện tìm kiếm
              </el-button>
              <el-button type="primary" @click="openDialogAddIndustry">
                <!-- <el-icon class="me-2"><Search /></el-icon> -->
                Thêm mới
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <div class="main-body-search mx-3 mb-3">
        <b-collapse
          v-model="tableRules.showFormSearch"
          id="myFormSearch"
          class=""
        >
          <el-card>
            <el-form
              ref="ruleFormRefSearch"
              :model="formSearchData.value"
              :rules="formSearchValid"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
              @submit.prevent="submitFormSearch(ruleFormRefSearch)"
            >
              <b-row>
                <b-col md="6">
                  <el-form-item label="Mã ngành nghề" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.value.code"
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="6">
                  <el-form-item label="Tên ngành nghề" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.value.name"
                    ></el-input>
                  </el-form-item>
                </b-col>
              </b-row>
              <div class="text-center">
                <el-button type="primary" @click="submitFormSearch(ruleFormRefSearch)"
                  >Tìm kiếm</el-button
                >
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableRules.data" style="width: 100%">
        <el-table-column prop="" label="STT" width="70" align="center">
          <template #default="scope">
            <div class="text-center">
              {{ tableRules.skip + scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="Mã ngành nghề" min-width="150" align="center" />
        <el-table-column prop="name" label="Tên ngành nghề" min-width="250" />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="140"
        >
          <template #default="scope">
            <div class="">
              <el-button
                size="small"
                type="primary"
                plain
                @click="handleAction('update', scope.row)"
                ><CIcon icon="cilPencil"
              /></el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="handleAction('delete', scope.row)"
                ><CIcon icon="cilTrash"
              /></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-3 mb-3" style="float: right">
        <el-pagination
          small
          v-model:currentPage="tableRules.page"
          v-model:pageSize="tableRules.limit"
          :page-sizes="tableRules.lengthMenu"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(tableRules.total)"
          @size-change="fn_tableSizeChange"
          @current-change="fn_tableCurentChange"
          @prev-click="fn_tablePrevClick"
          @next-click="fn_tableNextClick"
        />
      </div>
    </el-card>

    <!-- Start dialog add Industry-->
    <el-dialog
      v-model="dialogIndustry"
      title="Thêm mới ngành nghề"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      @close="resetForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData.value"
        :rules="validForm"
        label-width="140px"
        label-position="top"
        class="demo-ruleForm"
        status-icon
        @submit.prevent="submitForm(ruleFormRef)"
      >
        <b-row>
          <b-col md="6">
            <el-form-item label="Mã ngành nghề" prop="code">
              <el-input v-model="formData.value.code" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="6">
            <el-form-item label="Tên ngành nghề" prop="name">
              <el-input v-model="formData.value.name" autocomplete="off" />
            </el-form-item>
          </b-col>
        </b-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            {{ viewMode === 'create' ? 'Thêm mới' : 'Cập nhật' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- End dialog add Industry -->
  </div>
</template>

<style lang="scss" scoped>
</style>
