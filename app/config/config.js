const cors = require('cors')
const morgan = require('morgan')

const init = (app) => {
  app.use(morgan('dev'))
  app.use(cors())
}

module.exports.init = init
