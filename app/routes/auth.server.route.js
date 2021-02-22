const authMiddleware = require('../middlewares/auth.server.middleware')
const asyncMiddleware = require('../utils/async-middleware')
module.exports = (app) => {
  app.post(
    '/login',
    authMiddleware.login,
    asyncMiddleware(async (req, res) => {
      res.json({ message: 'login successfully', token: req.token })
    })
  )
}
