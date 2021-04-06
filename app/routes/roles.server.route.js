const roles = require('../controllers/roles.server.controller')
const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.use('/roles', requireLogin)
  app.route('/roles').get(roles.list).post(roles.create)

  app.route('/roles/:roleId').get(roles.read).put(roles.update)

  app.param('roleId', roles.getRoleById)
}
