const asyncMiddleware = require('../middlewares/async-middleware')
const _ = require('lodash')
const Bill = require('../models/bill.server.model')

const create = asyncMiddleware(async (req, res) => {
  const bill = new Bill(req.body)
  await bill.save()
  res.jsonp(bill)
})

const list = asyncMiddleware(async (req, res) => {
  const bills = await Bill.find({
    status: 'active',
  })
    .populate('products', 'sku description price')
    .populate('customer', 'phoneNumber displayName address')
    .lean()
  res.jsonp(bills)
})

const read = (req, res) => {
  res.jsonp(req.bill)
}

const update = asyncMiddleware(async (req, res) => {
  let { bill } = req
  bill = _.assign(bill, req.body, {
    updated: Date.now(),
  })
  await bill.save()
  res.jsonp(bill)
})

const getBillById = function (req, res, next, id) {
  Bill.findById(id)
    .populate('products', 'sku description price')
    .populate('customer', 'phoneNumber displayName address')
    .then((bill) => {
      if (!bill) {
        throw new Error('Can not get bill by this id')
      }
      req.bill = bill
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
  getBillById,
}
