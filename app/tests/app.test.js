const { mongoose, connect, disconnect } = require('../db/mongoose')
beforeAll(async () => {
  await connect()
  await mongoose.connection.dropDatabase()
})

afterAll(async () => {
  await disconnect(() => {
    console.log('Mongodb disconnect ')
  })
})

require('./users.controller.test')
