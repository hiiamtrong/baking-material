const config = require('./config/config')
const { app } = require('./app')
const { PORT } = require('./config/constants')
const db = require('./db/mongoose')
const port = PORT || 4000
config.init(app)
db.connect()
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
