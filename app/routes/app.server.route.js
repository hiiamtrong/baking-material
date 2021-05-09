const authRoutes = require('./auth.server.route')
const userRoutes = require('./users.server.route')
const productRoutes = require('./products.server.route')
const roleRoutes = require('./roles.server.route')
const categoriesRoutes = require('./categories.server.route')
const vouchersRoutes = require('./vouchers.server.route')
const { handleUploadImages } = require('../services/S3-aws')
const { requireLogin } = require('../middlewares/auth.server.middleware')
const customersRoutes = require('./customers.server.route')
const billsRoutes = require('./bills.server.route')
function init(app) {
  app.get('/', (req, res) => {
    res.jsonp({
      message: 'server is running',
    })
  })
  app.post('/upload', requireLogin, handleUploadImages)

  authRoutes(app)
  userRoutes(app)
  productRoutes(app)
  roleRoutes(app)
  categoriesRoutes(app)
  vouchersRoutes(app)
  customersRoutes(app)
  billsRoutes(app)
}

module.exports = {
  init,
}
