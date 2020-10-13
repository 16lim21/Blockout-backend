const mongoose = require('mongoose')

const schema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  }
})

module.exports = mongoose.model('User', schema)
