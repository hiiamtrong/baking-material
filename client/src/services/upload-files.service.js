import axiosClient from 'api/axiosClient'
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData()

    formData.append('file', file)

    return axiosClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
  }
}

export default new UploadFilesService()
