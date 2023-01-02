import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'industries' : `industries?${data}`)
  },
  create(data) {
    return Api().post('industries', data)
  },
  update(data) {
    return Api().put(`industries/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`industries/${id}`)
  },
  delete(id) {
    return Api().delete(`industries/${id}`)
  }
}
