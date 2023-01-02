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
  }
}
