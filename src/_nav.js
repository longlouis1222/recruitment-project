export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      // text: 'NEW',
    },
    role: ['*']
  },
  {
    component: 'CNavItem',
    name: 'Danh sách người dùng',
    to: '/admin/user-management/user-list',
    icon: 'cilPeople',
    role: ['ADMIN']
  },
  {
    component: 'CNavItem',
    name: 'Danh sách ngành nghề',
    to: '/admin/industry-management/industry-list',
    icon: 'cilLayers',
    role: ['ADMIN']
  },
  {
    component: 'CNavItem',
    name: 'Thông tin nhà tuyển dụng',
    to: '/employer/employer-account/employer-account-info',
    icon: 'cilHouse',
    role: ['EMPLOYER']
  },
  {
    component: 'CNavItem',
    name: 'Công ty',
    to: '/employer/employer-company/employer-company-info',
    icon: 'cilLibraryBuilding',
    role: ['EMPLOYER']
  },
  {
    component: 'CNavItem',
    name: 'Tạo tin tuyển dụng',
    to: '/employer/recruitment-post/recuitment-post-create',
    icon: 'cil-pencil',
    role: ['EMPLOYER']
  },
  {
    component: 'CNavItem',
    name: 'Danh sách bài tuyển dụng',
    to: '/employer/recruitment-post/recuitment-post-list',
    icon: 'cil-puzzle',
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    component: 'CNavItem',
    name: 'Tìm ứng viên',
    to: '/employer/find-candidate/find-candidate-list',
    icon: 'cilSearch',
    role: ['ADMIN' , 'EMPLOYER']
  },
  {
    component: 'CNavItem',
    name: 'Hồ sơ ứng viên đã lưu',
    to: '/employer/candidate-profile/candidate-profile-list',
    icon: 'cilLibraryAdd',
    role: ['EMPLOYER']
  },
  {
    component: 'CNavItem',
    name: 'Hồ sơ ứng viên ứng tuyển',
    to: '/employer/candidate-applied-profile/candidate-applied-profile-list',
    icon: 'cilStorage',
    role: ['EMPLOYER']
  },

  // EMPLOYEE

  {
    component: 'CNavItem',
    name: 'Tài khoản ứng viên',
    to: '/employee/employee-account/employee-account-info',
    icon: 'cilContact',
    role: ['CANDIDATE']
  },
  {
    component: 'CNavItem',
    name: 'Hồ sơ ứng viên',
    to: '/employee/curriculum-vitae/curriculum-vitae-info',
    icon: 'cilDescription',
    role: ['CANDIDATE']
  },
  {
    component: 'CNavItem',
    name: 'Hồ sơ của bạn',
    to: '/employee/employee-cv/employee-cv-info',
    icon: 'cilAddressBook',
    role: ['CANDIDATE']
  },
  {
    component: 'CNavItem',
    name: 'Việc làm quan tâm',
    to: '/employee/saved-post/saved-post-list',
    icon: 'cilPin',
    role: ['CANDIDATE']
  },
  {
    component: 'CNavItem',
    name: 'Việc làm đã ứng tuyển',
    to: '/employee/applied-jobs/applied-jobs-list',
    icon: 'cilBraille',
    role: ['CANDIDATE']
  },

  // {
  //   component: 'CNavTitle',
  //   name: 'Theme',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: 'cil-drop',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: 'cil-pencil',
  // },
  // {
  //   component: 'CNavTitle',
  //   name: 'Components',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Base',
  //   to: '/base',
  //   icon: 'cil-puzzle',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Breadcrumbs',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Carousels',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Collapses',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'List Groups',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Paginations',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: 'cil-cursor',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Buttons',
  //       to: '/buttons/standard-buttons',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Button Groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Forms',
  //   to: '/forms',
  //   icon: 'cil-notes',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: 'cil-chart-pie',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Icons',
  //   to: '/icons',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'CoreUI Icons',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'info',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Brands',
  //       to: '/icons/brands',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Flags',
  //       to: '/icons/flags',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Notifications',
  //   to: '/notifications',
  //   icon: 'cil-bell',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Modals',
  //       to: '/notifications/modals',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'primary',
  //     text: 'NEW',
  //     shape: 'pill',
  //   },
  // },
  // {
  //   component: 'CNavTitle',
  //   name: 'Extras',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Pages',
  //   to: '/pages',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Login',
  //       to: '/pages/login',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Register',
  //       to: '/pages/register',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'ForgotPassword',
  //       to: '/pages/forgot-password',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Error 404',
  //       to: '/pages/404',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Error 500',
  //       to: '/pages/500',
  //     },
  //   ],
  // },

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
