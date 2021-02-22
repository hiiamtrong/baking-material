const logger = require('morgan')
const fs = require('fs')
const dayjs = require('dayjs')
const { NODE_ENV } = require('../config/constants')
function init(app) {
  app.use(
    logger('combined', {
      stream: fs.createWriteStream('./all.log', { flags: 'a' }),
    })
  )
  app.use(logger('dev'))
}
async function error(error) {
  if (NODE_ENV !== 'production') {
    console.log(error.message)
  }

  await fs.appendFileSync(
    './error.log',
    `${dayjs().format('YYYY/MM/DD HH:mm:ss')} - ${error.message}\n`
  )
}

module.exports = {
  init,
  error,
}
