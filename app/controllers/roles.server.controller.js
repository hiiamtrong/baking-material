const Role = require('../models/role.server.model')
const asyncMiddleware = require('../middlewares/async-middleware')
const _ = require('lodash')

const create = asyncMiddleware(async (req, res) => {
  const { auth } = req
  const role = new Role(req.body)
  role.createdBy = auth
  await role.save()
  res.jsonp(role)
})

const list = asyncMiddleware(async (req, res) => {
  const roles = await Role.find({
    status: 'active',
  }).lean()
  res.jsonp(roles)
})

const read = (req, res) => {
  res.jsonp(req.role)
}

const update = asyncMiddleware(async (req, res) => {
  let { role, auth } = req
  role = _.assign(role, req.body, {
    updated: Date.now(),
    updatedBy: auth,
  })
  await role.save()
  res.jsonp(role)
})

const getUserById = function (req, res, next, id) {
  Role.findById(id)
    .then((role) => {
      if (!role) {
        throw new Error('Can not get role by this id')
      }
      req.role = role
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
  getUserById,
}
