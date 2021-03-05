const _ = require('lodash')
function isFalsy(value, isAdvanced = false) {
  if (isAdvanced) {
    if (['null', 'undefined'].includes(_.lowerCase(value))) {
      return true
    }
    if (_.isEmpty(value)) {
      return true
    }
  }
  return !!value
}

module.exports = {
  isFalsy,
}
