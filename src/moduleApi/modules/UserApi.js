import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'users' : `users?${data}`)
  },
  create(data) {
    return Api().post('users', data)
  },
  update(data) {
    return Api().put(`users/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`users/get-by-id?ids=${id}`)
  },
  delete(id) {
    return Api().delete(`users?ids=${id}`)
  },
  inactiveAccount(data) {
    return Api().get(`users/inactive?check=${data.status}&userId=${data.id}`)
  },
  getJobsApplied(data) {
    return Api().get(!data ? `users/get-list-topic-submit` : `users/get-list-topic-submit?${data}`)
  },
  deleteJobsApplies(id) {
    return Api().get(`users/remove-submit-topic?postId=${id}`)
  },
  applyJob(id) {
    return Api().get(`users/user-submit-topic?postId=${id}`)
  },
  getAppliedCVEmloyeeList(data) {
    return Api().get(!data ? 'users/get-list-topic-employee' : `users/get-list-topic-employee?${data}`)
  },
  deleteCVFromAppliedCVEmployeeList(id) {
    return Api().get(`users/remove-profile-by-employee?profileId=${id}`)
  }
}
