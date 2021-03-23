import history from 'utils/history'
import axiosClient from './axiosClient'

const authAPI = {
  login: async (data) => {
    const { token, refreshToken, user } = await axiosClient.post(
      '/auth/login',
      data
    )
    localStorage.setItem('token', token)
    localStorage.setItem('refresh-token', refreshToken)
    return user
  },
  refreshToken: async () => {
    const { token, user } = await axiosClient.get('/auth/refresh-token')
    if (!token) {
      history.push('/auth/login')
    }
    localStorage.setItem('token', token)
    return { user, token }
  },
}

export default authAPI
