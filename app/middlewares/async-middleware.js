const logger = require('../lib/logger')
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(async (err) => {
    await logger.error(err)
    next(err)
  })
}
