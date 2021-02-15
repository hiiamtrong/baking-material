const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const user = require('../models/user.server.model')

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password })

        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)
