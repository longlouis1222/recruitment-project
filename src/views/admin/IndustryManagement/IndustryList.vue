<script setup>
import MethodService from '@/service/MethodService'
import { ElNotification, ElMessageBox } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'
import IndustryApi from '@/moduleApi/modules/IndustryApi'

import modelData from './IndustryModel'

const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive(MethodService.copyObject(modelData.dataForm))
const formValid = reactive(MethodService.copyObject(modelData.validForm))
const formSearchData = reactive(
  MethodService.copyObject(tableRules.dataSearch.value),
)
const formSearchValid = reactive(
  MethodService.copyObject(tableRules.dataSearch.valid),
)

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
          const industryApiRes = await IndustryApi.create(formData)
          if (industryApiRes.status === 200) {
            console.log('create', industryApiRes)
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData)
          const industryApiRes = await IndustryApi.update(formData)
          if (industryApiRes.status === 200) {
            console.log('Update', industryApiRes)
            dialogIndustry.value = false
          }
        }
        viewMode.value = 'create'
        await getIndustryList()
      } catch (error) {
        console.log(error)
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
        const filter = MethodService.filterTable(
          JSON.stringify(formSearchData)
        );
        console.log('filter', filter)
        const industryApiRes = await IndustryApi.list(filter)
        if (industryApiRes.status === 200) {
          console.log('create', industryApiRes)
          tableRules.data = industryApiRes.data.data.data
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getIndustryList = async () => {
  const industryApiRes = await IndustryApi.list()
  if (industryApiRes.status === 200) {
    tableRules.data = industryApiRes.data.data.data
    console.log('getIndustryList', industryApiRes)
  }
}

const updateIndustry = (rowData) => {
  viewMode.value = 'update'
  console.log(rowData)
  dialogIndustry.value = true
  formData.id = rowData.id
  formData.code = rowData.code
  formData.name = rowData.name
}

const getIndustryById = async (rowData) => {
  console.log('rowData', rowData)

  const industryApiRes = await IndustryApi.findById(rowData.id)
  if (industryApiRes.status === 200) {
    console.log('getIndustryById', industryApiRes)
  }
}

const deleteIndustry = async (rowData) => {
  console.log(rowData)
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const industryApiRes = await IndustryApi.delete(rowData.id)
      if (industryApiRes.status === 200) {
        await getIndustryList()
        console.log(industryApiRes)
      }

      ElMessage({
        type: 'success',
        message: `Xóa thành công`,
      })
    },
  })
  // const industryApiRes = await IndustryApi.delete(rowData.id);
  // if (industryApiRes.status === 200) {
  //   await getIndustryList()
  //   console.log(industryApiRes)
  // }
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
  tableRules.offset = (tableRules.page - 1) * tableRules.limit
  // getService();
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

onMounted(async () => {
  // tableRules.total = tableData.length
  // console.log('tableRules.showFormSearch', tableRules.showFormSearch)
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
              <el-button
                type="primary"
                class="btn btn-soft-secondary btn-border"
                @click="toggleSearchBox"
              >
                <el-icon class="me-2"><Search /></el-icon>
                Ẩn/hiện tìm kiếm
              </el-button>
              <el-button
                type="primary"
                class="btn btn-soft-secondary btn-border"
                @click="openDialogAddIndustry"
              >
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
              ref="ruleFormRef"
              :model="formSearchData"
              :rules="formSearchValid"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
            >
              <b-row>
                <b-col md="6">
                  <el-form-item label="Mã" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.code"
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="6">
                  <el-form-item label="Tên ngành nghề" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.name"
                    ></el-input>
                  </el-form-item>
                </b-col>
              </b-row>
              <div class="text-center">
                <el-button type="primary" @click="submitFormSearch(ruleFormRef)"
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
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="Mã ngành nghề" width="150" />
        <el-table-column prop="name" label="Tên ngành nghề" />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="180"
        >
          <template #default="scope">
            <div class="">
              <!-- <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button> -->
              <el-button
                size="small"
                type="primary"
                plain
                @click="updateIndustry(scope.row)"
                ><CIcon icon="cilPencil"
              /></el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="deleteIndustry(scope.row)"
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
          :total="tableRules.total"
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
    >
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="formValid"
        label-width="140px"
        label-position="top"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <b-col md="6">
            <el-form-item label="Mã ngành nghề" prop="code">
              <el-input v-model="formData.code" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="6">
            <el-form-item label="Tên ngành nghề" prop="name">
              <el-input v-model="formData.name" autocomplete="off" />
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
