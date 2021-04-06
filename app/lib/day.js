const localizedFormat = require('dayjs/plugin/localizedFormat')
const dayjs = require('dayjs')
dayjs.extend(localizedFormat)

module.exports = dayjs
