import history from 'utils/history'
import axiosClient from './axiosClient'

const authAPI = {
  login: async (data) => {
    const { token, refreshToken, user } = await axiosClient.post(
      '/auth/login',
      data
    )
    return { token, refreshToken, user }
  },
  refreshToken: async () => {
    const { token, user, refreshToken } = await axiosClient.get(
      '/auth/refresh-token'
    )
    if (!token) {
      history.push('/auth/login')
    }
    return { user, token, refreshToken }
  },
}

export default authAPI
