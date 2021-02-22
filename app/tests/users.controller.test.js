const { app } = require('../app')
const request = require('supertest')

describe('user.server.controller.js', () => {
  test('should be create a new user', async () => {
    const result = await request(app).post('/users').send({
      username: 'test',
      email: 'test@gmail.com',
    })
    expect(result.status).toBe(200)
  })
})
