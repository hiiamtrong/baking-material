const NodeEnvironment = require('jest-environment-jsdom') // for browser js apps
const express = require('express')
class ExpressEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
  }

  async setup() {
    const app = express()
    let server
    await new Promise(function (resolve) {
      server = app.listen(0, '127.0.0.1', function () {
        console.log(
          `Running express server on '${JSON.stringify(server.address())}'...`
        )
        resolve()
      })
    })
    this.global.server = server
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
