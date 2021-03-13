import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refresh-token')
    const headers = {
      ...config.headers,
      'x-access-token': token,
      'refresh-token': refreshToken,
    }
    const _config = { ...config, headers }
    return _config
  },
  function (error) {
    return Promise.reject(error.response.data.error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error.response.data.error)
  }
)

export default axiosClient
