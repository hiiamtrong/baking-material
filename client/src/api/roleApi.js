import axiosClient from './axiosClient'

const rolesAPI = {
  getAll: async (params) => {
    const roles = await axiosClient.get('/roles', params)
    return roles
  },
  create: async (body) => {
    const roles = await axiosClient.post('/roles', body)
    return roles
  },
}

export default rolesAPI
