let DataService = {}

DataService.workFormList = [
  {
    label: 'Toàn thời gian cố định',
    value: 'Toàn thời gian cố định'
  },
  {
    label: 'Toàn thời gian tạm thời',
    value: 'Toàn thời gian tạm thời'
  },
  {
    label: 'Bán thời gian cố định',
    value: 'Bán thời gian cố định'
  },
  {
    label: 'Bán thời gian tạm thời',
    value: 'Bán thời gian tạm thời'
  },
  {
    label: 'Theo hợp đồng tư vấn',
    value: 'Theo hợp đồng tư vấn'
  },
  {
    label: 'Thực tập',
    value: 'Thực tập'
  },
  {
    label: 'Khác',
    value: 'Khác'
  },
]

DataService.certificateList = [
  {
    label: 'Trên đại học',
    value: 'Trên đại học'
  },
  {
    label: 'Đại học',
    value: 'Đại học'
  },
  {
    label: 'Cao đẳng',
    value: 'Cao đẳng'
  },
  {
    label: 'Trung cấp',
    value: 'Trung cấp'
  },
  {
    label: 'Trung học',
    value: 'Trung học'
  },
  {
    label: 'Chứng chỉ',
    value: 'Chứng chỉ'
  },
  {
    label: 'Không yêu cầu',
    value: 'Không yêu cầu'
  },
]

DataService.experienceList = [
  {
    label: 'Chưa có kinh nghiệm',
    value: 'Chưa có kinh nghiệm'
  },
  {
    label: 'Dưới 1 năm',
    value: 'Dưới 1 năm'
  },
  {
    label: '1 năm',
    value: '1 năm'
  },
  {
    label: '2 năm',
    value: '2 năm'
  },
  {
    label: '3 năm',
    value: '3 năm'
  },
  {
    label: '4 năm',
    value: '4 năm'
  },
  {
    label: '5 năm',
    value: '5 năm'
  },
  {
    label: 'Trên 5 năm',
    value: 'Trên 5 năm'
  },
]

DataService.rankList = [
  {
    label: 'Quản lý cấp cao',
    value: 'Quản lý cấp cao'
  },
  {
    label: 'Quản lý cấp trung',
    value: 'Quản lý cấp trung'
  },
  {
    label: 'Quản lý nhóm',
    value: 'Quản lý nhóm'
  },
  {
    label: 'Chuyên gia',
    value: 'Chuyên gia'
  },
  {
    label: 'Chuyên viên - nhân viên',
    value: 'Chuyên viên - nhân viên'
  },
  {
    label: 'Cộng tác viên',
    value: 'Cộng tác viên'
  }
]

DataService.ageRequirementList = [
  {
    label: '15-24 tuổi',
    value: '15-24 tuổi'
  },
  {
    label: '25-29 tuổi',
    value: '25-29 tuổi'
  },
  {
    label: '30-34 tuổi',
    value: '30-34 tuổi'
  },
  {
    label: '35-39 tuổi',
    value: '35-39 tuổi'
  },
  {
    label: '40-44 tuổi',
    value: '40-44 tuổi'
  },
  {
    label: 'Trên 45 tuổi',
    value: 'Trên 45 tuổi'
  }
]

DataService.genderRequirementList = [
  {
    label: 'Không yêu cầu',
    value: 'Không yêu cầu'
  },
  {
    label: 'Nam',
    value: 'Nam'
  },
  {
    label: 'Nữ',
    value: 'Nữ'
  },
]

DataService.mainJobList = [
  {
    label: 'Bán hàng',
    value: 'Bán hàng'
  },
  {
    label: 'Quản trị kinh doanh',
    value: 'Quản trị kinh doanh'
  },
  {
    label: 'Khách sạn - nhà hàng',
    value: 'Khách sạn - nhà hàng'
  },
  {
    label: 'Marketing - PR',
    value: 'Marketing - PR'
  },
  {
    label: 'Xây dựng',
    value: 'Xây dựng'
  },
  {
    label: 'Kiêm toán - kế toán',
    value: 'Kiêm toán - kế toán'
  },
  {
    label: 'Nhân sự',
    value: 'Nhân sự'
  },
  {
    label: 'Hành chính văn phòng',
    value: 'Hành chính văn phòng'
  },
  {
    label: 'Kinh doanh bất động sản',
    value: 'Kinh doanh bất động sản'
  },
  {
    label: 'An ninh - bảo vệ',
    value: 'An ninh - bảo vệ'
  },
  {
    label: 'Báo chí truyền hình',
    value: 'Báo chí truyền hình'
  },
  {
    label: 'Bảo hiểm',
    value: 'Bảo hiểm'
  },
  {
    label: 'Biên dịch - phiên dịch',
    value: 'Biên dịch - phiên dịch'
  },
  {
    label: 'Bưu chính',
    value: 'Bưu chính'
  },
  {
    label: 'Chứng khoán - vàng',
    value: 'Chứng khoán - vàng'
  },
  {
    label: 'Cơ khí - Chế tạo',
    value: 'Cơ khí - Chế tạo'
  },
  {
    label: 'Công nghệ cao',
    value: 'Công nghệ cao'
  },
  {
    label: 'Công nghiệp',
    value: 'Công nghiệp'
  },
  {
    label: 'Dầu khí - hóa chất',
    value: 'Dầu khí - hóa chất'
  },
]
