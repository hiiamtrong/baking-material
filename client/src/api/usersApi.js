import axiosClient from './axiosClient'

const usersAPI = {
  getAll: async (params) => {
    const users = await axiosClient.get('/users', params)
    return users
  },
  create: async (body) => {
    const users = await axiosClient.post('/users', body)
    return users
  },
}

export default usersAPI
