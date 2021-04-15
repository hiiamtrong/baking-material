const asyncMiddleware = require('../middlewares/async-middleware')

const _ = require('lodash')
const Product = require('../models/product.server.model')

const create = asyncMiddleware(async (req, res) => {
  const { auth } = req
  const product = new Product(req.body)
  product.createdBy = auth
  await product.save()
  res.jsonp(product)
})

const list = asyncMiddleware(async (req, res) => {
  const products = await Product.find({
    status: 'active',
  })
    .populate('categories', 'code label')
    .lean()
  res.jsonp(products)
})

const read = (req, res) => {
  res.jsonp(req.product)
}

const update = asyncMiddleware(async (req, res) => {
  let { product, auth } = req
  product = _.assign(product, req.body, {
    updated: Date.now(),
    updatedBy: auth,
  })
  await product.save()
  res.jsonp(product)
})

const getProductById = function (req, res, next, id) {
  Product.findById(id)
    .then((product) => {
      if (!product) {
        throw new Error('Can not get product by this id')
      }
      req.product = product
      next()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = {
  create,
  list,
  read,
  update,
  getProductById,
}
