const cors = require('cors')

const helmet = require('helmet')
const bodyParser = require('body-parser')
const route = require('../routes/app.server.route')
const logger = require('../lib/logger')
require('../auth/auth')
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
