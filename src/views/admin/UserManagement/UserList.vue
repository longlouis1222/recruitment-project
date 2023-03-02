<script setup>
import MethodService from '@/service/MethodService'
import UserApi from '@/moduleApi/modules/UserApi'

import { useRouter } from 'vue-router'
import { ElMessageBox, ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'

import modelData from './UserModel'

const router = useRouter()

const statusList = [
  {
    label: 'Chờ kích hoạt',
    value: 0
  },
  {
    label: 'Đã kích hoạt',
    value: 1
  },
  {
    label: 'Đã khóa',
    value: -1
  },
]

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
const moduleName = 'Danh sách người dùng'
const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm

const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const validFormSearch = tableRules.dataSearch.valid

const changeAccountStatus = async (rowData) => {
  try {
    const dataUpdate = {
      id: rowData.id,
      status: rowData.status == 1 ? true : false,
    }
    const userApiRes = await UserApi.inactiveAccount(dataUpdate)
    if (userApiRes.status == 200) {
      ElNotification({
        title: 'Success',
        message: 'Cập nhật thành công.',
        type: 'success',
        duration: 3000,
      })
      await getUserList()
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: 'Cập nhật thất bại.',
      type: 'error',
      duration: 3000,
    })
  }
}

const getUserList = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    // sort: tableRules.sort,
    ...tableRules.filters,
  }
  router.replace({
    name: moduleName,
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const userApiRes = await UserApi.list(filter)
  if (userApiRes.status == 200) {
    tableRules.data = userApiRes.data.data.data.filter(account => account.type !== 'ADMIN')
    tableRules.total = userApiRes.data.data.totalElements - 1
  }
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        tableRules.skip = 0
        tableRules.page = 1
        await getUserList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const deleteItem = async (id) => {
  ElMessageBox.alert('Bạn có chắc muốn xóa tài khoản này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      try {
        const userApiRes = await UserApi.delete(id)
        if (userApiRes.status === 200) {
          ElNotification({
            title: 'Success',
            message: 'Xóa thành công.',
            type: 'success',
            duration: 3000,
          })
          await getUserList()
        }
      } catch (error) {
        ElNotification({
          title: 'Error',
          message: 'Xóa thất bại.',
          type: 'error',
          duration: 3000,
        })
      }
    },
  })
}

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
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
  getUserList();
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

onMounted(() => {
  getUserList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách người dùng</h4>
            <el-button
              type="primary"
              @click="toggleSearchBox"
            >
              <el-icon class="me-2"><Search /></el-icon>
              Ẩn/hiện tìm kiếm
            </el-button>
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
              :model="formSearchData.value"
              :rules="validFormSearch"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
            >
              <b-row>
                <b-col md="3">
                  <el-form-item label="Tài khoản" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.value.username"
                    ></el-input>
                  </el-form-item>
                </b-col>
                <!-- <b-col md="4">
                  <el-form-item label="Họ và tên" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.value.userInfoDTO.fullName"
                    ></el-input>
                  </el-form-item>
                </b-col> -->
                <b-col md="3">
                  <el-form-item label="Email" prop="">
                    <el-input
                      clearable
                      v-model="formSearchData.value.email"
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Vai trò" prop="">
                    <el-select
                      v-model="formSearchData.value.type"
                      placeholder="Chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Trạng thái" prop="">
                    <el-select
                      v-model="formSearchData.value.status"
                      placeholder="Chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
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
        <el-table-column prop="" label="STT" width="50">
          <template #default="scope">
            <div class="text-center">
              {{ tableRules.skip + scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="Tài khoản" width="130" />
        <el-table-column prop="email" label="Email" min-width="160" />
        <el-table-column
          prop="userInfoDTO.fullName"
          label="Họ và tên"
          min-width="140"
        />
        <el-table-column prop="type" label="Vai trò" align="center">
          <template #default="scope">
            {{
              scope.row.type == 'CANDIDATE'
                ? 'Ứng viên'
                : scope.row.type == 'EMPLOYER'
                ? 'Nhà tuyển dụng'
                : 'Admin'
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Trạng thái"
          align="center"
          min-width="110"
        >
          <template #default="scope">
            <el-tag
              :type="
                scope.row.status == 0
                  ? 'info'
                  : scope.row.status == 1
                  ? 'success'
                  : 'danger'
              "
              disable-transitions
              >{{
                scope.row.status == 0
                  ? 'Chờ kích hoạt'
                  : scope.row.status == 1
                  ? 'Đã kích hoạt'
                  : 'Đã khóa'
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Khóa" align="center">
          <template #default="scope">
            <b-form-checkbox
              class="mt-1"
              v-model="scope.row.status"
              :value="-1"
              :unchecked-value="1"
              :disabled="scope.row.status == 0"
              @change="changeAccountStatus(scope.row)"
            >
            </b-form-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Thao tác" width="120">
          <template #default="scope">
            <div class="">
              <!-- <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button> -->
              <!-- <el-button
                size="small"
                type="primary"
                plain
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilPencil"
              /></el-button> -->
              <el-button
                size="small"
                type="danger"
                plain
                @click="deleteItem(scope.row.id)"
                title="Xóa"
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
  </div>
</template>

<style lang="scss" scoped>
:deep .form-check .form-check-input {
  float: none !important;
}
:deep .form-check-label {
  display: none
}
</style>
