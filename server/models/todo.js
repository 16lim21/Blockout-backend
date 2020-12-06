const mongoose = require('mongoose')

/**
 * Todo document schema
 * @namespace Todo
 * @property {String} _id - todo id
 * @property {String} name - todo name
 * @property {Number} duration - time required to complete todo item
 * @property {Date} deadline - date and time the item is due
 * @property {Number} minDuration - minimum amount of time for each event
 * @property {Number} maxDuration - maximum amount of time for each event
 */
const schema = mongoose.Schema(
    {
        /**
         * todo id
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
        duration: {
            type: Number,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        minDuration: {
            type: Number
        },
        maxDuration: {
            type: Number
        }
    },
    { _id: false }
)

module.exports = mongoose.model('ToDo', schema)
