import axiosClient from './axiosClient'

const productAPI = {
  getAll: async (params) => {
    const products = await axiosClient.get('/products', params)
    return products
  },
  create: async (body) => {
    const products = await axiosClient.post('/products', body)
    return products
  },
}

export default productAPI
