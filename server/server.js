/**
 * Creates backend express server
 * @module server
 * @author Michael Li
 * @exports app
 */

// Using dotenv for development environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Connects to MongoDB database
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

// Setup express app
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)

app.use(bodyParser.json()) // Parse application/json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
) // Parse application/x-www-form-urlencoded from tokenid

// Define application routing
const users = require('./api/routes/users')
app.use('/api/users', users)

const auth = require('./api/routes/auth')
app.use('/api', auth)

// Listen on specified port for express app
const PORT = process.env.PORT || 3001
http.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})

process.on('SIGINT', () => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
    process.exit(1)
})

module.exports = app
