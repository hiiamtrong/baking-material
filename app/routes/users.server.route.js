const users = require('../controllers/users.server.controller')
const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.use(requireLogin)
  app.route('/users').get(users.list).post(users.create)

  app.route('/users/:userId').get(users.read).put(users.update)

  app.param('userId', users.getUserById)
}
