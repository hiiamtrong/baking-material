const User = require('../models/user.server.model')
const asyncMiddleware = require('../middlewares/async-middleware')
const _ = require('lodash')

const create = asyncMiddleware(async (req, res) => {
  const { auth } = req
  const user = new User(req.body)
  user.createdBy = auth
  await user.save()
  res.jsonp(user)
})
const list = asyncMiddleware(async (req, res) => {
  const users = await User.find({
    status: 'active',
  })
    .populate('createdBy', 'username email displayName')
    .populate('roles', 'code label')
    .lean()
  res.jsonp(users)
})

const read = (req, res) => {
  res.jsonp(req.user)
}

const update = asyncMiddleware(async (req, res) => {
  let { user, account } = req
  user = _.assign(user, req.body, {
    updated: Date.now(),
    updatedBy: account || null,
  })
  await user.save()
  res.jsonp(user)
})

const getUserById = function (req, res, next, id) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new Error('Can not get user by this id')
      }
      req.user = user
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
