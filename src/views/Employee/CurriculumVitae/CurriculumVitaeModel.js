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
  date_of_birth: null,
  gender: null,
}

// validation form
model.validForm = {
  email: [ValidService.required],
  password: [ValidService.required],
  avatar: [ValidService.requiredChange],
  fullname: [ValidService.required],
  phone_number: [ValidService.required, ValidService.checkSpaceStringCenter],
  date_of_birth: [ValidService.requiredChange],
  gender: [ValidService.requiredChange],

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
  defaultSort: ['status_order', 'ascending'],
  filters: '',
  recordSelected: [],
  dataSearch: {
    value: {
      emp_names: '',
      asset_names: '',
      name: '',
      value: '',
      type: '',
      identity: '',
      status: '',
      is_broken: '',
    },
    valid: {
      emp_names: [],
      asset_names: [],
      name: [],
      value: [],
      type: [],
      identity: [
        ValidService.checkSpaceString,
        ValidService.checkSpaceStringCenter,
      ],
      status: [],
      is_broken: [],
    },
    operator: {
      emp_names: '$vn_text=',
      asset_names: '$vn_text=',
      name: '$vn_text=',
      value: '',
      identity: ':regex_i:',
      status: ':in:',
      is_broken: '',
    },
  },
}

export default model
