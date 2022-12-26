<script setup>
import MethodService from '@/service/MethodService'
import { ElNotification } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from '../EmployerCompany/EmployerCompanyInfoModel'

const ruleFormRef = ref(FormInstance)
const validForm = modelData.validForm
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive(MethodService.copyObject(modelData.dataForm))
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const tableData = [
  {
    name: 'Tin tức 24h siêu hot',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h siêu hot',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h siêu hot',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h siêu hot',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
  {
    name: 'Tin tức 24h siêu hot',
    date_post: '12/02/2022',
    end_date: '20/02/2022',
    approve_time: '22',
    read_time: '10',
    post_status: 'Nổi bật',
    status: 'Đã duyệt',
    others: 'Tin tức tuyển dụng',
  },
]

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

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
            <h4>Danh sách bài tuyển dụng</h4>
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
              :model="tableRules.dataSearch.value"
              :rules="validForm.value"
              label-position="top"
              @submit.prevent
            >
              <b-row>
                <b-col md="6">
                  <el-form-item label="Tên tin đăng" prop="name">
                    <el-input
                      clearable
                      v-model="tableRules.dataSearch.value['name']"
                    ></el-input>
                  </el-form-item>
                </b-col>
                <b-col md="6">
                  <el-form-item label="Ngày đăng" prop="fullname">
                    <el-input
                      clearable
                      v-model="tableRules.dataSearch.value['fullname']"
                    ></el-input>
                  </el-form-item>
                </b-col>
              </b-row>
              <div class="text-center">
                <el-button
                  class="primary"
                  style="width: 100px"
                  native-type="submit"
                >
                  Tìm kiếm
                </el-button>
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Tên tin đăng" min-width="180" />
        <el-table-column
          prop="date_post"
          label="Ngày đăng"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="end_date"
          label="Thời hạn nộp"
          min-width="100"
          align="center"
        />
        <el-table-column prop="approve_time" label="Lượt nộp" align="center" />
        <el-table-column prop="read_time" label="Lượt xem" align="center" />
        <el-table-column
          prop="post_status"
          label="Tình trạng tin"
          min-width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column prop="status" label="Trạng thái" align="center">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.status === 'Đã duyệt'
                  ? 'success'
                  : scope.row.status === 'Chờ duyệt'
                  ? 'warning'
                  : 'info'
              "
              disable-transitions
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="others" label="Khác" />
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
      <!-- <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="validForm"
        label-width="140px"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <h5 class="mb-4">Thông tin công ty</h5>
          <b-col md="7">
            <el-form-item label="Chức danh" prop="tax_code">
              <el-input v-model="formData.tax_code" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <el-form-item label="Hình thức làm việc" prop="company_name">
              <el-input v-model="formData.company_name" />
            </el-form-item>
            <el-form-item label="Bằng cấp" prop="company_name">
              <el-input v-model="formData.company_name" />
            </el-form-item>
            <el-form-item label="Kinh nghiệm" prop="personnel_size">
              <el-input v-model="formData.personnel_size" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <el-form-item label="Cấp bậc" prop="location">
              <el-input v-model="formData.location" />
            </el-form-item>
            <el-form-item label="Yêu cầu độ tuổi" prop="company_address">
              <el-input v-model="formData.company_address" />
            </el-form-item>
            <el-form-item label="Yêu cầu giới tính" prop="landline_phone">
              <el-input v-model="formData.landline_phone" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <el-form-item label="Số lượng tuyển" prop="location">
              <el-input v-model="formData.location" />
            </el-form-item>
            <el-form-item label="Thời gian thử việc" prop="company_address">
              <el-input v-model="formData.company_address" />
            </el-form-item>
            <el-form-item label="Hạn nộp hồ sơ" prop="landline_phone">
              <el-input v-model="formData.landline_phone" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <el-form-item label="Ngành nghề chính" prop="location">
              <el-input v-model="formData.location" />
            </el-form-item>
            <el-form-item label="Ngành nghề phụ" prop="company_address">
              <el-input v-model="formData.company_address" />
            </el-form-item>
            <el-form-item label="Nơi làm việc" prop="landline_phone">
              <el-input v-model="formData.landline_phone" />
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <b-col>
            <el-form-item label="Mức lương tối thiểu" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                multiple
                placeholder="Select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col>
            <el-form-item label="Mức lương tối đa" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                multiple
                placeholder="Select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col>
            <el-form-item label="Kỹ năng cần thiết" prop="field_of_acitvity">
              <el-select
                v-model="formData.field_of_acitvity"
                multiple
                placeholder="Select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider />

        <b-row>
          <b-col md="12">
            <el-form-item label="Mô tả công việc" prop="landline_phone">
              <el-input v-model="formData.landline_phone" type="textarea" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Yêu cầu công việc" prop="landline_phone">
              <el-input v-model="formData.landline_phone" type="textarea" />
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <el-form-item label="Quyền lợi" prop="landline_phone">
              <el-input v-model="formData.landline_phone" type="textarea" />
            </el-form-item>
          </b-col>
        </b-row>
        <div>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Cập nhật</el-button
          >
        </div>
      </el-form> -->
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
