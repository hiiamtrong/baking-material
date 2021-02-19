const passport = require('passport')
const jwt = require('jsonwebtoken')
const asyncMiddleware = require('../utils/async-middleware')

const User = require('../models/user.server.model')
const { generateToken } = require('../controllers/auth.server.controller')
const login = asyncMiddleware(async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    if (info.error) {
      return next(new Error(info.error))
    }

    if (err) {
      return next(error)
    }

    req.login(user, { session: false }, async (error) => {
      if (error) {
        return next(error)
      }
      const body = { _id: user._id }
      const token = generateToken({ body, type: 'TOKEN' })
      const refreshToken = generateToken({ body, type: 'REFRESH_TOKEN' })
      await User.updateOne({ _id: user._id }, { refreshToken })
      res
        .cookie('TOKEN', token, {
          maxAge: 365 * 24 * 60 * 60 * 100,
          httpOnly: true,
          // secure: true;
        })
        .cookie('REFRESH_TOKEN', refreshToken, {
          maxAge: 365 * 24 * 60 * 60 * 100,
          httpOnly: true,
          // secure: true;
        })
      res.jsonp({ auth: true })
    })
  })(req, res, next)
})

const requireLogin = asyncMiddleware(async (req, res, next) => {
  const access_token = req.cookies.access_token
  if (!access_token) {
    return next(new Error('Unthorized'))
  }
  next()
})

module.exports = {
  login,
  requireLogin,
}
