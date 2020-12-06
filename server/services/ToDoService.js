/**
 * Service to interact with todo database
 * @module services/ToDoService
 */
const ToDo = require('../models/todo')

/**
 * Gets all users from mongodb database
 * @returns {Document} - Returns all user documents
 */
function findAllItems () {
    return ToDo.find({})
}

/**
 * Get specific document
 * @param {string} id - ID string
 * @returns {document} - returns document by ID field
 */
function getItem (id) {
    return ToDo.findById({ _id: id })
}

/**
 * Post new item
 * @function
 * @param {Object} body - object representing todo item
 * @returns {Promise} – Promise to return document in mongoDB database
 */
function postItem (body) {
    const todo = new ToDo(body)
    return todo.save()
}

function patchItem (id, body, flags) {
    return ToDo.findByIdAndUpdate({ _id: id }, body, flags)
}

/**
 * Delete specific item
 * @param {string} id - ID string
 */
function deleteItem (id) {
    return ToDo.deleteOne({ _id: id })
}

module.exports = {
    findAllItems,
    getItem,
    postItem,
    patchItem,
    deleteItem
}
