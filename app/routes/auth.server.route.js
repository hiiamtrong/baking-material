const authMiddleware = require('../middlewares/auth.server.middleware')
const asyncMiddleware = require('../middlewares/async-middleware')
module.exports = (app) => {
  app.post(
    '/auth/login',
    authMiddleware.login,
    asyncMiddleware(async (req, res) => {
      const { token, refreshToken } = res.locals
      const user = req.user
      res.json({ token, refreshToken, user })
    })
  )
  app.get('/auth/refresh-token', authMiddleware.refreshToken)
}
