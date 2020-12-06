const mongoose = require('mongoose')
const ToDo = require('./todo')
/**
 * User document schema
 * @namespace User
 * @property {String} _id - user id
 * @property {String} name - user name
 * @property {String} email - user email
 */
const schema = mongoose.Schema(
    {
        /**
         * userId
         * @private
         */
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        todos: {
            type: [ToDo]
        }
    },
    { _id: false }
)

module.exports = mongoose.model('User', schema)
