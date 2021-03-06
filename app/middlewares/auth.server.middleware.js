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
      const body = { user: { _id: user._id } }
      const token = generateToken({ body, type: 'TOKEN' })
      const refreshToken = generateToken({ body, type: 'REFRESH_TOKEN' })
      await User.updateOne({ _id: user._id }, { refreshToken })
      delete user.password
      delete user.refreshToken
      delete user.salt
      res.locals = { ...res.locals, token, refreshToken }
      next()
    })
  })(req, res, next)
})

const requireLogin = asyncMiddleware(async (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  if (helper.isFalsy(accessToken, true)) {
    return res.status(401).jsonp('Invalid token')
  }
  const payload = await verifyToken({
    token: accessToken,
    type: 'TOKEN',
  }).catch((err) => {
    return res.status(401).jsonp(err.message)
  })
  if (helper.isFalsy(payload, true)) {
    return res.status(401).jsonp('Invalid token')
  }
  const user = await User.findById(payload.user._id).select(
    '-password -salt -refreshToken'
  )
  req.auth = user
  next()
})

const handleRefreshToken = async (refreshToken) => {
  if (helper.isFalsy(refreshToken, true)) {
    throw new Error('Unauthorized')
  }
  const payload = await verifyToken({
    token: refreshToken,
    type: 'REFRESH_TOKEN',
  }).catch(() => {
    throw new Error('Unauthorized')
  })
  if (helper.isFalsy(payload, true)) {
    throw new Error('Unauthorized')
  }
  const token = generateToken({ body: { user: payload.user }, type: 'TOKEN' })
  const newRefreshToken = generateToken({
    body: { user: payload.user },
    type: 'REFRESH_TOKEN',
  })
  return { token, payload, refreshToken: newRefreshToken }
}

const refreshToken = asyncMiddleware(async (req, res, next) => {
  const _refreshToken = req.headers['refresh-token']

  const { token, payload, refreshToken } = await handleRefreshToken(
    _refreshToken
  ).catch((err) => {
    return next(err)
  })
  const user = await User.findById(payload.user._id).select(
    '-password -salt -refreshToken'
  )
  if (!user) {
    throw new Error('Unauthorized')
  }
  res.jsonp({ token, user, refreshToken })
})

module.exports = {
  login,
  requireLogin,
  refreshToken,
}
