import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  benefits: null,
  companyDTO: {
    companyAddress: null,
    companyPhoneNumber: null,
    employeeNumber: null,
    fieldOfActivity: null,
    location: null,
    name: null,
    taxCode: null,
  },
  companyId: null,
  dateSubmit: null,
  industryDTO: {
    code: null,
    description: null,
    name: null,
  },
  industryId: null,
  jobApplicationDeadline: null,
  jobDescription: null,
  jobRequirements: null,
  level: null,
  necessarySkills: null,
  numberOfRecruits: null,
  probationaryPeriod: null,
  recruitmentArea: null,
  recruitmentAge: null,
  recruitmentDegree: null,
  recruitmentExperience: null,
  recruitmentGender: null,
  salaryMax: null,
  salaryMin: null,
  title: null,
  status: null,
  workingForm: null,
}

// validation form
model.validForm = {
  // tax_code: [ValidService.required],
  // company_name: [ValidService.required],
  // personnel_size: [ValidService.required],
  // location: [ValidService.required],
  // phone_number: [ValidService.required],
  // company_address: [ValidService.required],
  // landline_phone: [ValidService.required],
  // field_of_activity: [ValidService.requiredChange],
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
