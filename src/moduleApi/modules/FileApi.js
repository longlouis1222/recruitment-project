import Api from '../../moduleApi'

export default {
  uploadFile(data) {
    return Api().post(
      'google-driver/upload/file',
      `filePath=https://drive.google.com/drive/folders/1Evc0_Wr5g0ehP9nRPyiSYM_DFXxoHuMm?usp=share_link` +
        `&fileUpload=${data}` +
        `&shared=true`,
    )
  },
  downloadFile(id) {
    return Api().get(`google-driver/download/file/${id}`)
  },
  getFileById(id) {
    return Api().get(`google-driver/file/get-by-id/${id}`)
  },
  downloadStringFile(id) {
    return Api().get(`files/download/string/${id}`)
  }
}
