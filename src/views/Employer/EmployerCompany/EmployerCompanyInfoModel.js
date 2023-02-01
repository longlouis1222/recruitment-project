import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  companyRequest: {
    companyAddress: null,
    companyPhoneNumber: null,
    emailCompany: null,
    employeeNumber: null,
    fieldOfActivity: null,
    location: null,
    name: null,
    taxCode: null,
    businessIntroduction: null
  },
}

// validation form
model.validForm = {
  companyRequest: {
    companyAddress: [ValidService.required],
    companyPhoneNumber: [ValidService.required],
    emailCompany: [ValidService.required],
    employeeNumber: [ValidService.required],
    fieldOfActivity: [ValidService.requiredChange],
    location: [ValidService.required],
    name: [ValidService.required],
    taxCode: [ValidService.required],
    businessIntroduction: [ValidService.required],
  },
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
    value: {},
    valid: {},
    operator: {},
  },
}

export default model
