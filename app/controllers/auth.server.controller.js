const { CREDENTIALS } = require('../config/constants')
const jwt = require('jsonwebtoken')
const generateToken = ({ body, type }) => {
  console.log(CREDENTIALS[`${type}_LIFE`])
  console.log(CREDENTIALS[`${type}_SECRET`])
  return jwt.sign({ user: body }, CREDENTIALS[`${type}_SECRET`], {
    expiresIn: CREDENTIALS[`${type}_LIFE`],
  })
}

const verifyToken = async ({ token, type }) => {
  if (!token) {
    return null
  }
  const payload = await jwt.verify(token, CREDENTIALS[`${type}_SECRET`])
  return payload
}

module.exports = {
  generateToken,
  verifyToken,
}
