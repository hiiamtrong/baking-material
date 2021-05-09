const Customer = require('../models/customer.server.model')
const asyncMiddleware = require('../middlewares/async-middleware')
const _ = require('lodash')

const create = asyncMiddleware(async (req, res) => {
  const { auth } = req
  const customer = new Customer(req.body)
  customer.createdBy = auth
  await customer.save()
  res.jsonp(customer)
})

const list = asyncMiddleware(async (req, res) => {
  const customers = await Customer.find({
    status: 'active',
  }).lean()
  res.jsonp(customers)
})

const read = (req, res) => {
  res.jsonp(req.customer)
}

const update = asyncMiddleware(async (req, res) => {
  let { customer } = req
  customer = _.assign(customer, req.body, {
    updated: Date.now(),
  })
  await customer.save()
  res.jsonp(customer)
})

const getCustomerByPhoneNumber = function (req, res, next, phoneNumber) {
  console.log(phoneNumber)
  Customer.findOne({ phoneNumber })
    .then((customer) => {
      if (!customer) {
        throw new Error('Can not get customer by this phoneNumber')
      }
      req.customer = customer
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
  getCustomerByPhoneNumber,
}
