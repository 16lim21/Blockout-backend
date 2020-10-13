// Creating simple REST API following this tutorial https://rahmanfadhil.com/express-rest-api/
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const messenger = require('./routers/messenger')

const url = process.env.MONGODB_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) =>
    console.log(`Error connecting to MongoDB: ${error.message}`)
  )

const app = express()
app.use(express.json())
app.use('/api', messenger)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`)
})

module.exports = app
