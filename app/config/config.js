const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const errorHandler = require('errorhandler')
const route = require('../routes/app.server.route')
const logger = require('../lib/logger')
const path = require('path')
require('../auth/auth')
const init = (app) => {
  app.use(cookieParser())
  app.use(cors())
  app.use(errorHandler())
  app.use(helmet())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(express.static(path.join(__dirname, 'public')))

  logger.init(app)
  route.init(app)
}

module.exports = {
  init,
}
