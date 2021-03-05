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
      'a-access-token': token,
      'refresh-token': refreshToken,
    }
    const _config = { ...config, headers }
    return _config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error.response.data.error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data.error)
  }
)

export default axiosClient
