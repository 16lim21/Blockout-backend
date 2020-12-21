/**
 * Users module to handle interacting with user database
 * @module api/routes/users
 * @requires express
 * @exports router - express router to handle api calls to /api/users
 * @exports getUser - getUser functionality
 * @exports postUser - postUser functionality
 */
const express = require('express')
const router = express.Router()
const UserService = require('../../services/user-service')

/**
 * Handles get request for all users
 */
router.get('/', (request, response) => {
    UserService.findAllUsers().then((user) => response.json(user))
})

/**
 * Handles get request for specific userid
 */
router.get('/:id', (request, response) => {
    UserService.getUser(request.params.id)
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
 * Handles post request to user api route
 */
router.post('/', (request, response) => {
    const userBody = {
        _id: request.body._id,
        name: request.body.name,
        email: request.body.email
    }
    UserService.postUser(userBody)
        .then((result) => response.json(result))
        .catch((error) => response.send(error))
})

/**
 * Handles patch request for a specific user id
 */
router.patch('/:id', (req, res) => {
    UserService.patchUser(req.params.id, req.body, { new: true })
        .then((newUser) => {
            res.json(newUser)
        })
        .catch((error) => res.send(error))
})

/**
 * Handles delete request for a specific user id
 */
router.delete('/:id', (request, response) => {
    UserService.deleteUser(request.params.id)
        .then(() => {
            response.status(204).send()
        })
        .catch((error) => response.status(400).send(error))
})

module.exports = router
