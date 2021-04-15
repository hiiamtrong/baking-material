const categories = require('../controllers/categories.server.controller')
const { requireLogin } = require('../middlewares/auth.server.middleware')
module.exports = (app) => {
  app.use('/categories', requireLogin)
  app.route('/categories').get(categories.list).post(categories.create)

  app.route('/categories/:roleId').get(categories.read).put(categories.update)

  app.param('roleId', categories.getRoleById)
}
