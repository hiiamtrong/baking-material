const users = require('../controllers/users.server.controller')

module.exports = (app) => {
  app.route('/users').get(users.list).post(users.create)

  app.route('/users/:userId').get(users.read).put(users.update)

  app.param('userId', users.getUserById)
}
