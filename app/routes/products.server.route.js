const products = require('../controllers/products.server.controller')

// const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  //   app.use('/users', requireLogin)
  //   app.route('/users').get(users.list).post(users.create)
  //   app.route('/users/:userId').get(users.read).put(users.update)
  //   app.param('userId', users.getUserById)
  app.route('/products/upload').post(products.handleUploadImages)
}
