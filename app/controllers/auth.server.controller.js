const { CREDENTIALS } = require('../config/constants')
const jwt = require('jsonwebtoken')
const generateToken = ({ body, type }) => {
  console.log(CREDENTIALS[`${type}_LIFE`])
  console.log(CREDENTIALS[`${type}_SECRET`])
  return jwt.sign({ user: body }, CREDENTIALS[`${type}_SECRET`], {
    expiresIn: CREDENTIALS[`${type}_LIFE`],
  })
}

module.exports = {
  generateToken,
}
