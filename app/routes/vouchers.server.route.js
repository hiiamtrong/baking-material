const vouchers = require('../controllers/vouchers.server.controller')
const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.use('/vouchers', requireLogin)
  app.route('/vouchers').get(vouchers.list).post(vouchers.create)

  app.route('/vouchers/:voucherId').get(vouchers.read).put(vouchers.update)

  app.param('voucherId', vouchers.getVoucherById)
}
