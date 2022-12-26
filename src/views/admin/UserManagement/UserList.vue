<script setup>
import MethodService from '@/service/MethodService'
import { ref, reactive, onMounted } from 'vue'

import modelData from './UserModel'

const tableRules = reactive(MethodService.copyObject(modelData.tableRules))

const tableData = [
  {
    account: 'haitn',
    password: '********',
    firstname: 'Hải',
    lastname: 'Nguyễn',
    username: 'Nguyễn Hoàng Hải',
    dateOfbirth: '22/02/2001'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyễn',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'trangnth',
    password: '********',
    firstname: 'Trang',
    lastname: 'Nguyễn',
    username: 'Nguyễn Thị Huyền Trang',
    dateOfbirth: '12/04/1994'
  },
  {
    account: 'huenv',
    password: '********',
    firstname: 'Huế',
    lastname: 'Nguyễn',
    username: 'Nguyễn Văn Huế',
    dateOfbirth: '26/02/1997'
  },
  {
    account: 'khanhnn',
    password: '********',
    firstname: 'Khánh',
    lastname: 'Nguyễn',
    username: 'Nguyễn Ngọc Khánh',
    dateOfbirth: '12/11/1999'
  },
]

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

const fn_tableSizeChange = (limit) => {
  tableRules.limit = limit;
  fn_tableChangeOffset(1);
};
const fn_tableCurentChange = (page) => {
  fn_tableChangeOffset(page);
};
const fn_tablePrevClick = () => {
  // fn_tableChangeOffset(page);
};
const fn_tableNextClick = () => {
  // fn_tableChangeOffset(page);
};
const fn_tableChangeOffset = (page) => {
  tableRules.page = page;
  tableRules.offset = (tableRules.page - 1) * tableRules.limit;
  // getService();
};
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules;
  MethodService.tableSortChange(column, tableSort);
  // getService();
};

onMounted(() => {
  tableRules.total = tableData.length;
  // console.log('tableRules.showFormSearch', tableRules.showFormSearch)
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách thông tin người dùng</h4>
            <el-button
              type="primary"
              class="btn btn-soft-secondary btn-border"
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
              :model="formData"
              :rules="validForm"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
            >
              <b-row>
                <b-col md="4">
                  <el-form-item label="Tài khoản" prop="">
                    <el-input
                      clearable
                      v-model="tableRules.dataSearch.value['name']"
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Tên đầy đủ" prop="">
                    <el-select
                      v-model="tableRules.dataSearch.value['name']"
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
                <b-col md="4">
                  <el-form-item label="Ngày sinh" prop="">
                    <el-date-picker
                      v-model="tableRules.dataSearch.value['name']"
                      type="date"
                      placeholder="Chọn"
                    />
                  </el-form-item>
                </b-col>
              </b-row>
              <div class="text-center">
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                  >Tìm kiếm</el-button
                >
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="account" label="Tài khoản" width="120" />
        <el-table-column prop="password" label="Mật khẩu" width="100" />
        <el-table-column prop="firstname" label="Tên" />
        <el-table-column prop="lastname" label="Họ" />
        <el-table-column prop="username" label="Tên đầy đủ" min-width="120" />
        <el-table-column prop="dateOfbirth" label="Ngày sinh" />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="180"
        >
          <template #default>
            <div class="d-flex">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilFindInPage"
              /></el-button>
              <el-button
                size="small"
                type="primary"
                plain
                @click="handleEdit(scope.$index, scope.row)"
                ><CIcon icon="cilPencil"
              /></el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)"
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
  </div>
</template>

<style lang="scss" scoped>
</style>
