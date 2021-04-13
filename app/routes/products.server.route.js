const products = require('../controllers/products.server.controller')

const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.use('/products', requireLogin)
  app.route('/products').get(products.list).post(products.create)

  app.route('/products/:roleId').get(products.read).put(products.update)
  app.param('roleId', products.getProductById)
}
