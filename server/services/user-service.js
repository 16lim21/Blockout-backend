/**
 * Service to interact with User database
 * @module services/UserService
 */
const User = require('../models/user')

/**
 * Gets all users from mongodb database
 * @returns {Document} - Returns all user documents
 */
function findAllUsers () {
    return User.find({})
}

/**
 * Get user from mongodb database based on user id
 * @param {string} userid - userid string from google login
 * @returns {document} - returns user document by ID field
 */
function getUser (userid) {
    return User.findById({ _id: userid })
}

/**
 * Post new user to mongodb
 * @function
 * @param {Object} userBody - object representing user account
 * @returns {Promise} – Promise document representing the user document in mongoDB database
 */
function postUser (userBody) {
    const user = new User(userBody)
    return user.save()
}

function patchUser (userid, body, flags) {
    return User.findByIdAndUpdate({ _id: userid }, body, flags)
}

/**
 * Delete specific user from mongoDB
 * @param {string} userid - userId string from google login
 */
function deleteUser (userid) {
    return User.deleteOne({ _id: userid })
}

/**
 * A generic function to push an array element into any User attributes
 * @param {String} userid - The id of the user object we want to modify
 * @param {Object} field - the specific field we want to push to
 * @param {Object} value - the value we want to push into the array
 */
function pushItem (userid, field, value) {
    const query = {}
    query[field] = value

    return User.findOneAndUpdate({ _id: userid }, { $push: query })
        .then((updatedDocument) => {
            if (updatedDocument) {
                return updatedDocument
            } else {
                return Error("Couldn't find matching document")
            }
        })
        .catch((error) =>
            console.error(`Failed to find and update document: ${error}`)
        )
}
/**
 * A generic function to delete an array element from a User attribute
 * @param {String} userid - The id of the user object we want to modify
 * @param {Object} field - the specific field we want to push to
 * @param {Object} value - the value we want to push into the array
 */
function deleteItem (userid, field, value) {
    const query = {}
    query[field] = [value]

    return User.findOneAndUpdate({ _id: userid }, { $pullAll: query })
        .then((updatedDocument) => {
            if (updatedDocument) {
                console.log(
                    `Successfully deleted item from document: ${updatedDocument}.`
                )
                return updatedDocument
            } else {
                return Error("Couldn't find matching document")
            }
        })
        .catch((error) =>
            console.error(`Failed to find and delete document: ${error}`)
        )
}

module.exports = {
    findAllUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser,
    pushItem,
    deleteItem
}
