const cors = require('cors')

const helmet = require('helmet')
const bodyParser = require('body-parser')
require('../db/mongoose')
const route = require('../route/app.server.route')
const logger = require('./logger')

const init = (app) => {
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
