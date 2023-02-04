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
  },
  getPostUserSavedList(data) {
    return Api().get(!data ? 'posts/get-list-user-save' : `posts/get-list-user-save?${data}`)
  },
  increaseViewPost(id) {
    return Api().get(`posts/get-view?id=${id}`)
  },
  removeSavePost(id) {
    return Api().get(`posts/remove-post-saved?postId=${id}`)
  },
  saveToCare(id) {
    return Api().get(`posts/user-current-save?postId=${id}`)
  },
}
