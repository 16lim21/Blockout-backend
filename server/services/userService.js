const User = require('../models/user')

class UserService {
    /**
     * Gets all users from mongodb database
     */
    findAllUsers () {
        return User.find({})
    }

    /**
     * Get user from mongodb database based on user id
     * @param {string} userid - userid string from google login
     */
    getUser (userid) {
        return User.findById({ _id: userid })
    }

    /**
     * Post new user to mongodb
     * @function
     * @param {Object} userBody - object representing user account
     * @returns {Promise} – Promise document representing the user document in mongoDB database
     */
    postUser (userBody) {
        const user = new User(userBody)
        return user.save()
    }

    patchUser (userid, body, flags) {
        return User.findByIdAndUpdate({ _id: userid }, body, flags)
    }

    /**
     * Delete specific user from mongoDB
     * @param {string} userid - userId string from google login
     */
    deleteUser (userid) {
        return User.deleteOne({ _id: userid })
    }
}

module.exports = new UserService()
