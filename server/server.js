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
const session = require('express-session')
const cors = require('cors')
const app = express()

const http = require('http').createServer(app)

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

app.use(bodyParser.json()) // Parse application/json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
) // Parse application/x-www-form-urlencoded from tokenid

app.use(
    session({
        secret: 'blockout',
        resave: 'false',
        saveUninitialized: 'false',
        sameSite: 'lax'
    })
)

// Define application routing
const users = require('./api/routes/users')
app.use('/api/users', users)

const auth = require('./api/routes/auth')
app.use('/api', auth)

const blockout = require('./api/routes/blockout')
app.use('/api/blockout', blockout)

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
