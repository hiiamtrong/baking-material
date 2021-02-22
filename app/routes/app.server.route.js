const authRoutes = require('./auth.server.route')
const userRoutes = require('./users.server.route')

function init(app) {
  app.get('/', (req, res) => {
    res.jsonp({
      message: 'server is running',
    })
  })
  authRoutes(app)
  userRoutes(app)
}

module.exports = {
  init,
}
