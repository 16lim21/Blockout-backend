// Followed tutorial from https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai#a-better-test
const chai = require('chai')
const auth = require('../../server/api/routes/auth')
const users = require('../../server/api/routes/users')
const assert = require('assert')
const { OAuth2Client, LoginTicket } = require('google-auth-library')
const nock = require('nock')

const chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)

describe('Testing Blockout API', () => {
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

        const result = await auth.verify(client, idToken)
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
        const result = await auth.checkUser(payload)

        if (result) {
            assert.strictEqual(result._id, payload.sub)
            users
                .deleteUser(payload.sub)
                .then(() => {
                    console.log('deleted user')
                })
                .catch((error) => console.log(error))
        }
    })
})
