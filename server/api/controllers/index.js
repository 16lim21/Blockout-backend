const express = require('express')
const router = express.Router()

// Define application routing
const users = require('./users')
router.use('/users', users)

const auth = require('./auth')
router.use('/', auth)

const blockout = require('./blockout')
router.use('/blockout', blockout)

module.exports = router
