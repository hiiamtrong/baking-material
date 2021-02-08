const mongoose = require('mongoose')
const { MONGO_URI } = require('../config/constants')
const { error } = require('../lib/logger')
const connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Mongodb connect successfully !')
    })
    .catch((err) => {
      error(err)
    })
}

mongoose.connection.on('disconnect', () => {
  console.log('Mongodb disconnect successfully!')
})

mongoose.connection.on('error', error)

module.exports = {
  mongoose,
  connect,
  disconnect: (done) => {
    mongoose.disconnect(done)
  },
}
