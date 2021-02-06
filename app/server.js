const express = require('express')
require('./db/mongoose')
const config = require('./config/config')

const app = express()
const port = process.env.PORT || 4000
config.init(app)
app.get('/', (req, res) => {
  res.jsonp({
    message: 'hello world',
  })
})

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
