/**
 * Handles user verification and authentication
 * @module services/AuthService
 * @requires google-auth-library
 * @exports AuthService - An Authentication Service Class
 */
const { OAuth2Client } = require('google-auth-library')
const UserService = require('./user-service')

class AuthService {
    /**
     * Constructor for AuthService class
     * @constructor
     * @param {OAuth2Client} googleClient - Google OAuth2Client object
     */
    constructor (googleClient = new OAuth2Client(process.env.CLIENT_ID)) {
        this.googleClient = googleClient
    }

    /**
     * Handles the sign in process and returns the mongoDB document
     * @async
     * @param {string} idToken - userid token sent from client frontend
     * @returns - Returns the promise of a document object representing the new/existing user
     */
    async signIn (idToken) {
        const payload = await this.verifyToken(idToken)
        const userDoc = await this.checkUser(payload)
        return userDoc
    }

    /**
     * Verifies token with Google OAuth2
     * @function
     * @async
     * @param {string} token - userid token sent from client frontend
     * @returns {Promise<TokenPayLoad>} payload - payload object that represents user information
     */
    async verifyToken (token) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        const payload = ticket.getPayload()

        return payload
    }

    /**
     * Checks if user exists in blockout database and creates one if not.
     * @function
     * @async
     * @param {TokenPayLoad} payload - payload object that represents user information
     * @returns {Promise<Document>} - Returns the promise of a document object representing the new/existing user
     */
    async checkUser (payload) {
        const userid = payload.sub
        return UserService.getUser(userid)
            .then((dbuser) => {
                if (dbuser) {
                    return dbuser
                } else {
                    const userBody = {
                        _id: userid,
                        name: payload.name,
                        email: payload.email
                    }
                    return UserService.postUser(userBody).then(
                        (result) => result
                    )
                }
            })
            .catch((error) => console.error(error))
    }
}

module.exports = AuthService
