const Category = require('../models/category.server.model')
const asyncMiddleware = require('../middlewares/async-middleware')
const _ = require('lodash')

const create = asyncMiddleware(async (req, res) => {
  const { auth } = req
  const category = new Category(req.body)
  category.createdBy = auth
  await category.save()
  res.jsonp(category)
})

const list = asyncMiddleware(async (req, res) => {
  const categories = await Category.find({
    status: 'active',
  }).lean()
  res.jsonp(categories)
})

const read = (req, res) => {
  res.jsonp(req.category)
}

const update = asyncMiddleware(async (req, res) => {
  let { category, auth } = req
  category = _.assign(category, req.body, {
    updated: Date.now(),
    updatedBy: auth,
  })
  await category.save()
  res.jsonp(category)
})

const getRoleById = function (req, res, next, id) {
  Category.findById(id)
    .then((category) => {
      if (!category) {
        throw new Error('Can not get category by this id')
      }
      req.category = category
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
  getRoleById,
}
