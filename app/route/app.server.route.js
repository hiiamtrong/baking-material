const userRoutes = require('./users.server.route')
function init(app) {
  app.get('/', (req, res) => {
    res.jsonp({
      message: 'hello world',
    })
  })
  userRoutes(app)
}

module.exports.init = init
