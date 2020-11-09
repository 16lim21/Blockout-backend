/**
 * Users module to handle interacting with user database
 * @module routers/users
 * @requires express
 * @exports router - express router to handle api calls to /api/users
 * @exports getUser - getUser functionality
 * @exports postUser - postUser functionality
 */
const express = require('express')
const User = require('../models/user')
const router = express.Router()

/**
 * Handles get request for all users
 */
router.get('/', (request, response) => {
    User.find({}).then((user) => response.json(user))
})

/**
 * Handles get request for specific userid
 */
router.get('/:id', (request, response) => {
    getUser(request.params.id)
        .then((user) => {
            if (user) {
                response.json(user)
            } else {
                response
                    .status(404)
                    .send({ error: 'user ID does not exist' })
                    .end()
            }
        })
        .catch((error) => response.send(error))
})

/**
 * GetUser from mongodb database based on user id
 * @param {string} userid - userid string from google login
 */
const getUser = (userid) => {
    return User.findById({ _id: userid })
}

/**
 * Handles post request to user api route
 */
router.post('/', (request, response) => {
    const userBody = {
        _id: request.body._id,
        name: request.body.name,
        email: request.body.email
    }
    postUser(userBody)
        .then((result) => response.json(result))
        .catch((error) => response.send(error))
})

/**
 * Post new user to mongodb
 * @function
 * @param {Object} userBody - object representing user account
 * @returns {Promise} – Promise document representing the user document in mongoDB database
 */
const postUser = (userBody) => {
    const user = new User(userBody)
    return user.save()
}

/**
 * Handles patch request for a specific user id
 */
router.patch('/:id', (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((newUser) => {
            res.json(newUser)
        })
        .catch((error) => res.send(error))
})

/**
 * Handles delete request for a specific user id
 */
router.delete('/:id', (request, response) => {
    deleteUser(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => response.send(error))
})

/**
 * Delete specific user from mongoDB
 * @param {string} userid - userId string from google login
 */
const deleteUser = (userid) => {
    return User.deleteOne({ _id: userid })
}

module.exports = {
    router: router,
    getUser: getUser,
    postUser: postUser,
    deleteUser: deleteUser
}
