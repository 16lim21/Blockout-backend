// const ToDoService = require('../server/services/todo-service')
const AuthService = require('../server/services/auth-service')
// const assert = require('assert')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

let server
if (!process.env.SERVER_URL) {
    server = 'http://localhost:3001'
}

describe('Testing Todo service and routes', function () {
    let agent

    before(() => {
        agent = chai.request.agent(server)
    })

    after(() => {
        agent.close()
    })

    describe('POST /api/tokensignin', () => {
        it('it should Login with fake user idtoken', () => {
            sinon.stub(AuthService.prototype, 'signIn').callsFake((idToken) => {
                const user = {
                    todos: [],
                    _id: '1',
                    name: 'test_name',
                    email: 'test_email',
                    __v: 0
                }
                return user
            })

            agent
                .post('/api/tokensignin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ idtoken: '12345' })
                .then((response) => {
                    expect(response).to.have.cookie('connect.sid')
                    sinon.assert.calledOnce(AuthService.prototype.signIn)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    })
})
