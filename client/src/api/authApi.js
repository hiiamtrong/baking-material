import axiosClient from './axiosClient'

const authAPI = {
  login: async (data) => {
    const { token, refreshToken, ...response } = await axiosClient.post(
      '/auth/login',
      data
    )
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    return { ...response }
  },
}

export default authAPI
