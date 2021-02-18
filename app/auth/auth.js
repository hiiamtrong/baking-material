const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user.server.model')

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username })

        if (!user) {
          return done(null, false, { message: 'User not found', status: 401 })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password', status: 401 })
        }

        return done(null, user, {
          message: 'Logged in Successfully',
          status: 200,
        })
      } catch (error) {
        return done(error)
      }
    }
  )
)
