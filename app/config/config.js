const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const route = require('../routes/app.server.route')
const logger = require('../lib/logger')
require('../auth/auth')
const init = (app) => {
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors())

  app.use(helmet())

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  logger.init(app)
  route.init(app)
}

module.exports = {
  init,
}
