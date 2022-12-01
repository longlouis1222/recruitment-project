import Api from '../../moduleApi'

export default {
  update(data) {
    return Api().post('update', data)
  },
}
