const cors = require('cors')
const morgan = require('morgan')
require('../db/mongoose')
const init = (app) => {
  app.use(morgan('dev'))
  app.use(cors())
}

module.exports.init = init
