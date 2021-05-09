const Voucher = require('../models/voucher.serevr.model')
const asyncMiddleware = require('../middlewares/async-middleware')
const _ = require('lodash')

const create = asyncMiddleware(async (req, res) => {
  const { auth } = req
  const voucher = new Voucher(req.body)
  voucher.createdBy = auth
  await voucher.save()
  res.jsonp(voucher)
})

const list = asyncMiddleware(async (req, res) => {
  const vouchers = await Voucher.find({
    status: 'active',
  }).lean()
  res.jsonp(vouchers)
})

const read = (req, res) => {
  res.jsonp(req.voucher)
}

const update = asyncMiddleware(async (req, res) => {
  let { voucher, auth } = req
  voucher = _.assign(voucher, req.body, {
    updated: Date.now(),
    updatedBy: auth,
  })
  await voucher.save()
  res.jsonp(voucher)
})

const getRoleById = function (req, res, next, id) {
  Voucher.findById(id)
    .then((voucher) => {
      if (!voucher) {
        throw new Error('Can not get voucher by this id')
      }
      req.voucher = voucher
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
