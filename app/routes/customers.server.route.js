const customers = require('../controllers/customers.server.controller')
const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.route('/customers').get(customers.list).post(customers.create)

  app.route('/customers/:phoneNumber').get(customers.read).put(customers.update)

  app.param('phoneNumber', customers.getCustomerByPhoneNumber)
}
