const mongoose = require('mongoose')
const { MONGO_URI } = require('../config/constants')
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Mongodb connect successfully !')
  })
  .catch((err) => {
    console.error(err)
  })
