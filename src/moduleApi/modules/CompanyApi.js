import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'companys' : `companys?${data}`)
  },
  findById(id) {
    return Api().get(`companys/${id}`)
  },
}
