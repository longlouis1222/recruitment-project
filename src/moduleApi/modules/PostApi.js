import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'posts' : `posts?${data}`)
  },
  create(data) {
    return Api().post('posts', data)
  },
  update(data) {
    return Api().put(`posts/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`posts/${id}`)
  },
  delete(id) {
    return Api().delete(`posts/${id}`)
  }
}
