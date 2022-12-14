<script setup>
import MethodService from '@/service/MethodService'
import { ref, reactive, onMounted } from 'vue'

import modelData from './UserModel'

const tableRules = reactive(MethodService.copyObject(modelData.tableRules))

const tableData = [
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
  {
    account: 'longlouis',
    password: '********',
    firstname: 'Long',
    lastname: 'Nguyen',
    username: 'Nguyễn Huy Long',
    dateOfbirth: '12/02/2000'
  },
]

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
          <span>Danh sách thông tin người dùng</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="account" label="Tài khoản" width="180" />
        <el-table-column prop="password" label="Mật khẩu" width="180" />
        <el-table-column prop="firstname" label="Tên" />
        <el-table-column prop="lastname" label="Họ" />
        <el-table-column prop="username" label="Tên đầy đủ" />
        <el-table-column prop="dateOfbirth" label="Ngày sinh" />
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
