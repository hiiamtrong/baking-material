const authRoutes = require('./auth.server.route')
const userRoutes = require('./users.server.route')
const productRoutes = require('./products.server.route')
const roleRoutes = require('./roles.server.route')
const categoriesRoutes = require('./categories.server.route')
const { handleUploadImages } = require('../services/S3-aws')
const { requireLogin } = require('../middlewares/auth.server.middleware')
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
}

module.exports = {
  init,
}
