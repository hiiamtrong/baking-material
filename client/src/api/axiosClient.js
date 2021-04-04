import axios from 'axios'
import { LocalStorages } from 'utils/localStorages'
import authAPI from './authApi'
const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  function (config) {
    const token = LocalStorages.getToken()
    const refreshToken = LocalStorages.getRefreshToken()
    const headers = {
      ...config.headers,
      'x-access-token': token,
      'refresh-token': refreshToken,
    }
    const _config = { ...config, headers }
    return _config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    return response?.data
  },

  function (err) {
    if (
      err?.response?.status === 401 &&
      err?.config &&
      !err?.config?.__isRetryRequest
    ) {
      return authAPI
        .refreshToken()
        .then(({ token }) => {
          LocalStorages.setToken(token)
          err.config.__isRetryRequest = true
          err.config.headers['x-access-token'] = token
          return axiosClient(err.config)
        })
        .catch(function (error) {
          throw error
        })
    }
    return Promise.reject(err)
  }
)

export default axiosClient
