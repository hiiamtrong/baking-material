const User = require('../model/user.server.model')
const { app } = require('../server')
const request = require('supertest')
// const assert = require('assert')
beforeEach(async () => {
  await User.deleteMany({})
})

describe('user.server.controller.js', () => {
  test('should be create a new user', async () => {
    await request(app)
      .post('/users')
      .send({
        username: 'test',
      })
      .expect(200)
  })
})
