const passport = require('passport')
const asyncMiddleware = require('../utils/async-middleware')
const User = require('../models/user.server.model')
const {
  generateToken,
  verifyToken,
} = require('../controllers/auth.server.controller')
const login = asyncMiddleware(async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    if (info.error) {
      return next(new Error(info.error))
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
      // res
      //   .cookie('TOKEN', token, {
      //     maxAge: 365 * 24 * 60 * 60 * 100,
      //     httpOnly: true,
      //     // secure: true;
      //   })
      //   .cookie('REFRESH_TOKEN', refreshToken, {
      //     maxAge: 365 * 24 * 60 * 60 * 100,
      //     httpOnly: true,
      //     // secure: true;
      //   })
      res.jsonp({ token, refreshToken })
    })
  })(req, res, next)
})

const requireLogin = asyncMiddleware(async (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  const refreshToken = req.headers['refresh-token']
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

    // const token = generateToken({ body: payload, type: 'TOKEN' })
  }
  next()
})

module.exports = {
  login,
  requireLogin,
}
