import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  email: null,
  password: null,
  avatar: null,
  fullname: null,
  phone_number: null,
  contact_email: null,
  address: null,
}

// validation form
model.validForm = {
  email: [ValidService.required],
  password: [ValidService.required],
  avatar: [ValidService.requiredChange],
  fullname: [ValidService.required],
  phone_number: [ValidService.required, ValidService.checkSpaceStringCenter],
  // contact_email: [ValidService.required],
  // address: [ValidService.required],
}

model.dataFormOther = {}

// validation các form khác
model.validFormOther = {}

model.tableRules = {
  data: [],
  lengthMenu: [10, 20, 50, 100],
  allowPaging: true,
  allowSorting: true,
  allowSelect: false,
  showFormSearch: false,
  showUrl: true,
  total: 0,
  page: 1,
  limit: 10,
  skip: 0,
  sort: '',
  defaultSort: ['', 'ascending'],
  filters: '',
  recordSelected: [],
  dataSearch: {
    value: {
      username: '',
      email: '',
      // userInfoDTO: {
      //   fullName: '',
      // },
      type: '',
      status: '',
    },
    valid: {},
    operator: {
      username: '',
      email: '',
      // userInfoDTO: {
      //   fullName: '',
      // },
      type: '',
      status: '',
    },
  },
}

export default model
