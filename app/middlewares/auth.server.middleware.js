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
    if (info && !/[23]\d+/.test(info.status)) {
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
  if (helper.isFalsy(accessToken, true)) {
    return next(new Error('Invalid Token'))
  }
  const payload = await verifyToken({
    token: accessToken,
    type: 'TOKEN',
  })
  if (helper.isFalsy(payload, true)) {
    return next(new Error('Unauthorized'))
  }
  const user = await User.findById(payload.user._id)
  req.auth = user
  next()
})

const handleRefreshToken = async (refreshToken) => {
  if (helper.isFalsy(refreshToken, true)) {
    throw new Error('Invalid Refresh Token')
  }
  const payload = await verifyToken({
    token: refreshToken,
    type: 'REFRESH_TOKEN',
  })
  if (helper.isFalsy(payload, true)) {
    throw new Error('Unauthorized')
  }
  const token = generateToken({ body: payload, type: 'TOKEN' })
  return { token, payload }
}

const refreshToken = asyncMiddleware(async (req, res) => {
  const refreshToken = req.headers['refresh-token']
  const { token, payload } = await handleRefreshToken(refreshToken)
  const user = await User.findById(payload.user._id)
  res.jsonp({ token, user })
})

module.exports = {
  login,
  requireLogin,
  refreshToken,
}
