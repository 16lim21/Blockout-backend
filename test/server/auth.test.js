const chai = require('chai')
const UserAuth = require('../../server/services/userAuth')
const UserService = require('../../server/services/userService')
const assert = require('assert')
const { OAuth2Client, LoginTicket } = require('google-auth-library')
const nock = require('nock')

const chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)

describe('Testing User Authentication API', () => {
    let client
    beforeEach(() => {
        client = new OAuth2Client(process.env.CLIENT_ID)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    // Testing based on verifyIdToken test from google-auth-library
    // https://github.com/googleapis/google-auth-library-nodejs/blob/master/test/test.oauth2.ts
    it('Should verify idtoken properly (though idtoken is fake)', async () => {
        const fakeCerts = { a: 'a', b: 'b' }
        const idToken = 'idToken'
        const payload = {
            aud: 'aud',
            sub: 'sub',
            iss: 'iss',
            iat: 1514162443,
            exp: 1514166043
        }

        const scope = nock('https://www.googleapis.com')
            .get('/oauth2/v1/certs')
            .reply(200, fakeCerts)

        client.verifySignedJwtWithCertsAsync = async (
            jwt,
            certs,
            requiredAudience,
            issuers,
            theMaxExpiry
        ) => {
            assert.strictEqual(jwt, idToken)
            assert.deepStrictEqual(certs, fakeCerts)
            return new LoginTicket('c', payload)
        }
        const userAuthInstance = new UserAuth(client)
        const result = await userAuthInstance.verifyToken(idToken)
        scope.done()

        if (result) {
            assert.strictEqual(result, payload)
        }
    })

    it('Should check database for user, create the new user, then delete it', async () => {
        const payload = {
            aud: 'aud',
            sub: 'sub',
            iss: 'iss',
            iat: 1514162443,
            exp: 1514166043,
            name: 'test_user',
            email: 'test@gmail.com'
        }
        const userAuthInstance = new UserAuth(client)
        const result = await userAuthInstance.checkUser(payload)

        if (result) {
            assert.strictEqual(result._id, payload.sub)
            UserService.deleteUser(payload.sub)
                .then(() => {
                    console.log('deleted user')
                })
                .catch((error) => console.log(error))
        }
    })
})
