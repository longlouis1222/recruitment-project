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
    value: 0.5,
    // value: 'Dưới 1 năm'
  },
  {
    label: '1 năm',
    value: 1,
    // value: '1 năm'
  },
  {
    label: '2 năm',
    value: 2,
    // value: '2 năm'
  },
  {
    label: '3 năm',
    value: 3,
    // value: '3 năm'
  },
  {
    label: '4 năm',
    value: 4,
    // value: '4 năm'
  },
  {
    label: '5 năm',
    value: 5,
    // value: '5 năm'
  },
  {
    label: 'Trên 5 năm',
    value: 6,
    // value: 'Trên 5 năm'
  },
]

DataService.probationaryPeriodList = [
  {
    label: 'Không cần thử việc',
    value: 'Không cần thử việc'
  },
  {
    label: '1 tháng',
    value: '1 tháng'
  },
  {
    label: '2 tháng',
    value: '2 tháng'
  },
  {
    label: '3 tháng',
    value: '3 tháng'
  },
  {
    label: '4 tháng',
    value: '4 tháng'
  },
  {
    label: '5 tháng',
    value: '5 tháng'
  },
  {
    label: 'Trên 5 tháng',
    value: 'Trên 5 tháng'
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
    label: 'Kiểm toán - kế toán',
    value: 'Kiểm toán - kế toán'
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

DataService.secondJobList = [
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

DataService.workPlaceList = [
  {
    label: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    label: 'TP.HCM',
    value: 'TP.HCM',
  },
  {
    label: 'An Giang',
    value: 'An Giang',
  },
  {
    label: 'Bà Rịa - Vũng Tàu',
    value: 'Bà Rịa - Vũng Tàu',
  },
  {
    label: 'Bắc Cạn - Bắc Giang',
    value: 'Bắc Cạn - Bắc Giang',
  },
  {
    label: 'Bạc Liêu',
    value: 'Bạc Liêu',
  },
  {
    label: 'Bắc Ninh',
    value: 'Bắc Ninh',
  },
  {
    label: 'Bến Tre',
    value: 'Bến Tre',
  },
  {
    label: 'Bình Dương',
    value: 'Bình Dương',
  },
  {
    label: 'Bình Phước',
    value: 'Bình Phước',
  },
  {
    label: 'Bình Thuận',
    value: 'Bình Thuận',
  },
  {
    label: 'Bình Định',
    value: 'Bình Định',
  },
  {
    label: 'Cà Mau',
    value: 'Cà Mau',
  },
  {
    label: 'Cần Thơ',
    value: 'Cần Thơ',
  },
  {
    label: 'Cần Thơ',
    value: 'Cần Thơ',
  },
  {
    label: 'Cao Bằng',
    value: 'Cao Bằng',
  },
  {
    label: 'Gia Lai',
    value: 'Gia Lai',
  },
  {
    label: 'Hà Nam',
    value: 'Hà Nam',
  },
  {
    label: 'Hà Giang',
    value: 'Hà Giang',
  },
  {
    label: 'Hà Tĩnh',
    value: 'Hà Tĩnh',
  },
  {
    label: 'Hải Dương',
    value: 'Hải Dương',
  },
  {
    label: 'Hải Phòng',
    value: 'Hải Phòng',
  },
  {
    label: 'Hậu Giang',
    value: 'Hậu Giang',
  },
  {
    label: 'Hòa Bình',
    value: 'Hòa Bình',
  },
  {
    label: 'Hưng Yên',
    value: 'Hưng Yên',
  },
  {
    label: 'Khác',
    value: 'Khác',
  },
  {
    label: 'Khánh Hòa',
    value: 'Khánh Hòa',
  },
  {
    label: 'Kiên Giang',
    value: 'Kiên Giang',
  },
  {
    label: 'Kom Tum',
    value: 'Kom Tum',
  },
  {
    label: 'Lai Châu',
    value: 'Lai Châu',
  },
  {
    label: 'Lâm Đồng',
    value: 'Lâm Đồng',
  },
  {
    label: 'Lạng Sơn',
    value: 'Lạng Sơn',
  },
  {
    label: 'Lào Cai',
    value: 'Lào Cai',
  },
  {
    label: 'Long An',
    value: 'Long An',
  },
  {
    label: 'Miền Bắc',
    value: 'Miền Bắc',
  },
  {
    label: 'Miền Nam',
    value: 'Miền Nam',
  },
  {
    label: 'Miền Trung',
    value: 'Miền Trung',
  },
  {
    label: 'Nam Định',
    value: 'Nam Định',
  },
  {
    label: 'Nghệ An',
    value: 'Nghệ An',
  },
  {
    label: 'Ninh Bình',
    value: 'Ninh Bình',
  },
  {
    label: 'Ninh Thuận',
    value: 'Ninh Thuận',
  },
  {
    label: 'Nước Ngoài',
    value: 'Nước Ngoài',
  },
  {
    label: 'Phú Thọ',
    value: 'Phú Thọ',
  },
  {
    label: 'Phú Yên',
    value: 'Phú Yên',
  },
  {
    label: 'Quản Nam',
    value: 'Quản Nam',
  },
  {
    label: 'Quảng Ngãi',
    value: 'Quảng Ngãi',
  },
  {
    label: 'Quảng Ninh',
    value: 'Quảng Ninh',
  },
  {
    label: 'Quản Trị',
    value: 'Quản Trị',
  },
  {
    label: 'Sóc Trăng',
    value: 'Sóc Trăng',
  },
  {
    label: 'Sơn La',
    value: 'Sơn La',
  },
  {
    label: 'Tây Ninh',
    value: 'Tây Ninh',
  },
  {
    label: 'Thái Bình',
    value: 'Thái Bình',
  },
  {
    label: 'Thái Nguyên',
    value: 'Thái Nguyên',
  },
  {
    label: 'Thanh Hóa',
    value: 'Thanh Hóa',
  },
  {
    label: 'Thừa Thiên Huế',
    value: 'Thừa Thiên Huế',
  },
  {
    label: 'Tiền Giang',
    value: 'Tiền Giang',
  },
  {
    label: 'Toàn Quốc',
    value: 'Toàn Quốc',
  },
  {
    label: 'Trà Vinh',
    value: 'Trà Vinh',
  },
  {
    label: 'Tuyên Quang',
    value: 'Tuyên Quang',
  },
  {
    label: 'Vĩnh Long',
    value: 'Vĩnh Long',
  },
  {
    label: 'Vĩnh Phúc',
    value: 'Vĩnh Phúc',
  },
  {
    label: 'Yên Bái',
    value: 'Yên Bái',
  },
  {
    label: 'Đà Nẵng',
    value: 'Đà Nẵng',
  },
  {
    label: 'Đắk Lắk',
    value: 'Đắk Lắk',
  },
  {
    label: 'Đắk Nông',
    value: 'Đắk Nông',
  },
  {
    label: 'Điện Biên',
    value: 'Điện Biên',
  },
  {
    label: 'Đồng Nai',
    value: 'Đồng Nai',
  },
  {
    label: 'Đồng Tháp',
    value: 'Đồng Tháp',
  },
]

DataService.minSalaryList = [
  {
    label: '1 triệu',
    value: '1 triệu',
  },
  {
    label: '2 triệu',
    value: '2 triệu',
  },
  {
    label: '3 triệu',
    value: '3 triệu',
  },
  {
    label: '4 triệu',
    value: '4 triệu',
  },
  {
    label: '5 triệu',
    value: '5 triệu',
  },
  {
    label: '6 triệu',
    value: '6 triệu',
  },
  {
    label: '7 triệu',
    value: '7 triệu',
  },
  {
    label: '8 triệu',
    value: '8 triệu',
  },
  {
    label: '9 triệu',
    value: '9 triệu',
  },
  {
    label: '10 triệu',
    value: '10 triệu',
  },
  {
    label: '11 triệu',
    value: '11 triệu',
  },
]

DataService.maxSalaryList = [
  {
    label: '1 triệu',
    value: '1 triệu',
  },
  {
    label: '2 triệu',
    value: '2 triệu',
  },
  {
    label: '3 triệu',
    value: '3 triệu',
  },
  {
    label: '4 triệu',
    value: '4 triệu',
  },
  {
    label: '5 triệu',
    value: '5 triệu',
  },
  {
    label: '6 triệu',
    value: '6 triệu',
  },
  {
    label: '7 triệu',
    value: '7 triệu',
  },
  {
    label: '8 triệu',
    value: '8 triệu',
  },
  {
    label: '9 triệu',
    value: '9 triệu',
  },
  {
    label: '10 triệu',
    value: '10 triệu',
  },
  {
    label: '11 triệu',
    value: '11 triệu',
  },
]

DataService.foreignLanguageList = [
  {
    label: 'Tiếng Anh',
    value: 'Tiếng Anh',
  },
  {
    label: 'Tiếng Nhật',
    value: 'Tiếng Nhật',
  },
  {
    label: 'Tiếng Pháp',
    value: 'Tiếng Pháp',
  },
  {
    label: 'Tiếng Trung',
    value: 'Tiếng Trung',
  },
  {
    label: 'Tiếng Nga',
    value: 'Tiếng Nga',
  },
  {
    label: 'Tiếng Hàn',
    value: 'Tiếng Hàn',
  },
  {
    label: 'Tiếng Đức',
    value: 'Tiếng Đức',
  },
  {
    label: 'Tiếng Ý',
    value: 'Tiếng Ý',
  },
  {
    label: 'Tiếng Ả Rập',
    value: 'Tiếng Ả Rập',
  },
  {
    label: 'Khác',
    value: 'Khác',
  },
]

DataService.proficiencyList = [
  {
    label: 'Sơ cấp',
    value: 'Sơ cấp',
  },
  {
    label: 'Trung cấp',
    value: 'Trung cấp',
  },
  {
    label: 'Cao cấp',
    value: 'Cao cấp',
  },
]

DataService.officeSkillList = [
  {
    label: 'Adobe Photoshop',
    value: 'Adobe Photoshop',
  },
  {
    label: 'Adobe Illutrator',
    value: 'Adobe Illutrator',
  },
  {
    label: 'Adobe Premiere',
    value: 'Adobe Premiere',
  },
  {
    label: 'Word',
    value: 'Word',
  },
  {
    label: 'Excel',
    value: 'Excel',
  },
  {
    label: 'PowerPoint',
    value: 'PowerPoint',
  },
]

DataService.postStatusList = [
  {
    label: 'Chờ duyệt',
    value: 'WAITING_APPROVE'
  },
  {
    label: 'Đã duyệt',
    value: 'APPROVED'
  },
  {
    label: 'Từ chối',
    value: 'REJECT'
  },
]

DataService.postOutstandingList = [
  {
    label: 'Không',
    value: false
  },
  {
    label: 'Có',
    value: true
  },
]

export default DataService
