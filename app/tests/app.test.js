const { mongoose, connect, disconnect } = require('../db/mongoose')
// eslint-disable-next-line no-undef
beforeAll(async () => {
  await connect()
  await mongoose.connection.dropDatabase()
})

// eslint-disable-next-line no-undef
afterAll(async () => {
  await disconnect(() => {
    console.log('Mongodb disconnect ')
  })
})

require('./users.controller.test')
