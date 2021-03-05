import axiosClient from './axiosClient'

const usersAPI = {
  getAll: async (params) => {
    const users = await axiosClient.get('/users', params)
    return users
  },
}

export default usersAPI
