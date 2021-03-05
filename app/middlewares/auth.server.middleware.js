const passport = require('passport')
const asyncMiddleware = require('./async-middleware')
const helper = require('../utils/helper')
const User = require('../models/user.server.model')
const {
  generateToken,
  verifyToken,
} = require('../controllers/auth.server.controller')
const login = asyncMiddleware(async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    if (info && info.status !== 200) {
      return next(new Error(info.message))
    }

    if (err) {
      return next(err)
    }

    req.login(user, { session: false }, async (error) => {
      if (error) {
        return next(error)
      }
      const body = { _id: user._id }
      const token = generateToken({ body, type: 'TOKEN' })
      const refreshToken = generateToken({ body, type: 'REFRESH_TOKEN' })
      User.updateOne({ _id: user._id }, { refreshToken })
      res.locals = { ...res.locals, token, refreshToken }
      next()
    })
  })(req, res, next)
})

const requireLogin = asyncMiddleware(async (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  const refreshToken = req.headers['refresh-token']
  if (helper.isFalsy(accessToken, true) && helper.isFalsy(refreshToken, true)) {
    return next(new Error('Unauthorized'))
  }
  const payload = await verifyToken({
    token: accessToken,
    type: 'TOKEN',
  })
  if (!payload) {
    const payloadRefresh = await verifyToken({
      token: refreshToken,
      type: 'REFRESH_TOKEN',
    })
    if (!payloadRefresh) {
      return next(new Error('Unauthorized'))
    }
  }
  next()
})

module.exports = {
  login,
  requireLogin,
}
