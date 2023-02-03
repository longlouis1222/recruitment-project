import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'recruitments' : `recruitments?${data}`)
  },
  create(data) {
    return Api().post('recruitments', data)
  },
  update(data) {
    return Api().put(`recruitments/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`recruitments/${id}`)
  },
  delete(id) {
    return Api().delete(`recruitments/${id}`)
  },
  getCurrentUserCV() {
    return Api().get(`recruitments/user-id`)
  },
  activeSearchUserCV(data) {
    return Api().get(`recruitments/active-search?check=${data}`)
  },
  saveList(data) {
    return Api().post(`recruitments/save-list`, data)
  },
  getRecruitmentSavedList(data) {
    return Api().get(`recruitments/get-list-id`)
  },
  getView(id) {
    return Api().get(`recruitments/get-view?id=${id}`)
  },
  removeProfile(id) {
    return Api().get(`recruitments/remove-profile?profileId=${id}`)
  },
}
