const authRoutes = require('./auth.server.route')
const userRoutes = require('./users.server.route')
const productRoutes = require('./products.server.route')
function init(app) {
  app.get('/', (req, res) => {
    res.jsonp({
      message: 'server is running',
    })
  })
  authRoutes(app)
  userRoutes(app)
  productRoutes(app)
}

module.exports = {
  init,
}
