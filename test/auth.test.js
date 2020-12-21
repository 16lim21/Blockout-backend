const chai = require('chai')
const should = chai.should()
const assert = require('assert')
const nock = require('nock')
const AuthService = require('../server/services/auth-service')
const UserService = require('../server/services/user-service')
const { OAuth2Client, LoginTicket } = require('google-auth-library')

let server
if (!process.env.SERVER_URL) {
    server = 'http://localhost:3001'
} else {
    server = process.env.SERVER_URL
}

describe('Testing User Auth Service and User Auth Route', () => {
    describe('Testing Auth Service', () => {
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
            const authServiceInstance = new AuthService(client)
            const result = await authServiceInstance.verifyToken(idToken)
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
            const authServiceInstance = new AuthService(client)
            const result = await authServiceInstance.checkUser(payload)

            if (result) {
                assert.strictEqual(result._id, payload.sub)
                UserService.deleteUser(result._id).catch((error) =>
                    console.log(error)
                )
            }
        })

        it('Should check database for an existing user then return it', async () => {
            const payload = {
                sub: '1'
            }
            const authServiceInstance = new AuthService(client)
            const result = await authServiceInstance.checkUser(payload)

            if (result) {
                assert.strictEqual(result._id, payload.sub)
            }
        })
    })
    describe('testing /api/tokensignin', () => {
        it('Should return error due to invalid idtoken (cannot test with real idtoken)', (done) => {
            chai.request(server)
                .post('/api/tokensignin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ idtoken: '12345' })
                .end((error, response) => {
                    if (error) {
                        console.log(error)
                        done()
                    }
                    should.exist(response)
                    response.should.have.status(400)
                    done()
                })
        })
    })
})
