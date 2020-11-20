const User = require('../models/user')

/**
 * Gets all users from mongodb database
 */
function findAllUsers () {
    return User.find({})
}

/**
 * Get user from mongodb database based on user id
 * @param {string} userid - userid string from google login
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

module.exports = {
    findAllUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser
}
