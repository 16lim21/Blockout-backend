const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const router = express.Router()

// Get all users
router.get('/users', (req, res) => {
  User.find({}).then((user) => res.json(user))
})

// Get individual user
router.get('/users/:id', (req, res) => {
  User.findById({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then((user) => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).send({ error: 'user ID does not exist' }).end()
      }
    })
    .catch((error) => res.send(error))
})

// Post new user
router.post('/users', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  user.save()
    .then((result) => res.json(result))
    .catch((error) => res.send(error))
})

// Update user
router.patch('/users/:id', (req, res) => {
  User.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    req.body,
    { new: true }
  )
    .then((newUser) => {
      res.json(newUser)
    })
    .catch((error) => res.send(error))
})

// Delete user
router.delete('/users/:id', (req, res) => {
  User.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => res.send(error))
})
module.exports = router
