const express = require('express')
const config = require('./config/config')

const app = express()
const port = process.env.PORT || 4000
config.init(app)

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
