const express = require('express')
const config = require('./config/config')
const app = express()
config.init(app)
module.exports = { app }
