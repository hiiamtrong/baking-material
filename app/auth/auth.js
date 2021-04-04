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
        const user = await User.findOne({ username }).select(
          '-salt -refreshToken'
        )

        if (!user) {
          return done(null, false, {
            message: 'Không tìm thấy tài khoản đăng nhập',
            status: 401,
          })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Sai mật khẩu', status: 401 })
        }

        return done(null, user, {
          message: 'Đăng nhập thành công',
          status: 200,
        })
      } catch (error) {
        return done(error)
      }
    }
  )
)
