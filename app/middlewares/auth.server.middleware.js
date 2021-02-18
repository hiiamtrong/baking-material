const passport = require('passport')
const jwt = require('jsonwebtoken')
const asyncMiddleware = require('../utils/async-middleware')
const login = asyncMiddleware(async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    if (info.error) {
      return next(new Error(info.error))
    }

    if (err) {
      return next(error)
    }

    req.login(user, { session: false }, async (error) => {
      if (error) return next(error)

      const body = { _id: user._id, username: user.username }
      const token = jwt.sign({ user: body }, 'TOP_SECRET')
      req.token = token
      next()
    })
  })(req, res, next)
})

module.exports = {
  login,
}
