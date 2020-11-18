/**
 * Module to authenticate user sign in
 * @module api/routes/auth
 * @requires express
 * @exports router - express router to handle api calls to /api/tokensignin
 */
const express = require('express')
const router = express.Router()
const AuthService = require('../../services/AuthService')

/**
 * Router method to handle post requests to /api/tokensignin
 * @function
 * @async
 */
router.post('/tokensignin', async (request, response) => {
    try {
        // Authenticate User
        const authServiceInstance = new AuthService()
        const result = await authServiceInstance.signIn(request.body.id_token)

        // Add session variables if user is authenticated
        request.session.cookie.maxAge = request.body.expires_in * 1000
        request.session.access_token = request.body.access_token

        // Send back response
        response.json(result)
    } catch (error) {
        response.status(400).send(error)
    }
})

module.exports = router
