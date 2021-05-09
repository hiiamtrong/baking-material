const bills = require('../controllers/bills.server.controller')

const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.use('/bills', requireLogin)
  app.route('/bills').get(bills.list).post(bills.create)

  app.route('/bills/:billId').get(bills.read).put(bills.update)
  app.param('billId', bills.getBillById)
}
