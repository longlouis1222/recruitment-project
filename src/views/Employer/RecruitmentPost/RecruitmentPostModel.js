import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  benefits: '',
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
  jobDescription: '',
  jobRequirements: '',
  level: null,
  necessarySkills: '',
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

  fullNameContactor: null,
  emailContactor: null,
  phoneNumberContactor: null,
  addressContactor: null,
}

// validation form
model.validForm = {
  title: [ValidService.required],
  workingForm: [ValidService.requiredChange],
  recruitmentDegree: [ValidService.requiredChange],
  recruitmentExperience: [ValidService.requiredChange],
  level: [ValidService.requiredChange],
  recruitmentAge: [ValidService.requiredChange],
  recruitmentGender: [ValidService.requiredChange],
  numberOfRecruits: [ValidService.required, ValidService.checkNumber, ValidService.checkNumberInteger],
  probationaryPeriod: [ValidService.requiredChange],
  jobApplicationDeadline: [ValidService.requiredChange],
  industryId: [ValidService.requiredChange],
  recruitmentArea: [ValidService.requiredChange],
  workplace: [ValidService.requiredChange],
  salaryMin: [ValidService.required],
  salaryMax: [ValidService.required],
  necessarySkills: [ValidService.requiredChange],
  jobDescription: [ValidService.required],
  jobRequirements: [ValidService.required],
  benefits: [ValidService.required],
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
      title: '',
      industryId: '',
      recruitmentArea: '',
      recruitmentExperience: '',
      salaryMin: '',
      salaryMax: '',
      level: '',
      workForm: '',
      recruitmentGender: '',
    },
    valid: {
      title: [],
      industryId: [],
      recruitmentArea: [],
      recruitmentExperience: [],
      salaryMin: [],
      salaryMax: [],
      level: [],
      workForm: [],
      recruitmentGender: [],
    },
    operator: {
      title: '',
      industryId: '',
      recruitmentArea: '',
      recruitmentExperience: '',
      salaryMin: '',
      salaryMax: '',
      level: '',
      workForm: '',
      recruitmentGender: '',
    },
  },
}

export default model
