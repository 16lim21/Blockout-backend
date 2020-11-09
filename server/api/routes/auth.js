/**
 * Modify google calendar using gcal api
 * @module routers/blockout
 * @requires express
 * @requires google-auth-library
 * @exports router - express router to handle api calls to /api
 */
const express = require('express')
const { OAuth2Client } = require('google-auth-library')
const router = express.Router()
const user = require('./users')

const googleClient = new OAuth2Client(process.env.CLIENT_ID)
/**
 * Token verification method
 * @function
 * @async
 * @param {string} token - userid token sent from client frontend
 * @returns {Promise<TokenPayLoad>} payload - payload object that represents user information
 */
const verify = async (client, token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })
    const payload = ticket.getPayload()

    return payload
}

/**
 * Checks if user exists in blockout database and creates one if not.
 * @function
 * @param {TokenPayLoad} payload - payload object that represents user information
 * @returns {Promise<Document>} - Returns the promise of a document object representing the new/existing user
 */
const checkUser = async (payload) => {
    const userid = payload.sub
    return user
        .getUser(userid)
        .then((dbuser) => {
            if (dbuser) {
                return dbuser
            } else {
                const userBody = {
                    _id: userid,
                    name: payload.name,
                    email: payload.email
                }
                return user.postUser(userBody).then((result) => result)
            }
        })
        .catch((error) => console.error(error))
}

/**
 * Router method to handle post requests to /api/tokensignin
 * @function
 */
router.post('/tokensignin', (request, response) => {
    response.set({
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    verify(googleClient, request.body.idtoken)
        .then((payload) => checkUser(payload))
        .then((result) => {
            response.json(result)
        })
        .catch((error) => console.error(error))
})

module.exports = {
    router: router,
    verify: verify,
    checkUser: checkUser
}