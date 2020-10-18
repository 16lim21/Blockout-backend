// Using dotenv for development environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose')
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

const express = require('express')
const users = require('./routers/users')

const app = express()
const http = require('http').createServer(app)

app.use(express.json())
app.use('/api', users)

const PORT = process.env.PORT || 3001
http.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})

module.exports = app
