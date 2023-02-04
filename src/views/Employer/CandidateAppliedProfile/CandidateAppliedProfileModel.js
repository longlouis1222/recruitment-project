import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {}

// validation form
model.validForm = {}

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
      career: '',
      positionOffer: '',
      offerSalary: '',
      experienceNumber: '',
      workAddress: '',
      workForm: '',
    },
    valid: {
      career: [],
      positionOffer: [],
      offerSalary: [],
      experienceNumber: [],
      workAddress: [],
      workForm: [],
    },
    operator: {
      career: '',
      positionOffer: '',
      offerSalary: '',
      experienceNumber: '',
      workAddress: '',
      workForm: '',
    },
  },
}

export default model
