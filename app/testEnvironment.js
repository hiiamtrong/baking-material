const express = require('express')
// const NodeEnvironment = require('jest-environment-node'); // for server node apps
const NodeEnvironment = require('jest-environment-jsdom') // for browser js apps
const { PORT } = require('./config/constants')
const { mongoose } = require('./db/mongoose')

class ExpressEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    await super.setup()
    let server
    const app = express()

    await new Promise(function (resolve) {
      server = app.listen(PORT, '127.0.0.1', function () {
        console.log(`Running express server on port ${PORT}`)
        resolve()
      })
    })
    this.global.server = server
    app.use(express.static('../testfiles'))
  }

  async teardown() {
    this.global.server.close()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = ExpressEnvironment
