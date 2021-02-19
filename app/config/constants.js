require('dotenv').config()
module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CREDENTIALS: {
    TOKEN_SECRET: 'trong_dep_trai',
    REFRESH_TOKEN_SECRET: 'trong_dep_trai_refresh',
    TOKEN_LIFE: 10 * 60,
    REFRESH_TOKEN_LIFE: '2 days',
  },
}
