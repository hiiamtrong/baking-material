import axiosClient from './axiosClient'

const categoryAPI = {
  getAll: async (params) => {
    const categories = await axiosClient.get('/categories', params)
    return categories
  },
  create: async (body) => {
    const categories = await axiosClient.post('/categories', body)
    return categories
  },
}

export default categoryAPI
