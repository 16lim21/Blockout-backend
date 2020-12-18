// const ToDoService = require('../server/services/todo-service')
const AuthService = require('../server/services/auth-service')
// const assert = require('assert')
const sinon = require('sinon')

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

describe('Testing Todo service and routes', function () {
    let agent
    this.timeout(3000)

    before((done) => {
        const server = require('../server/server')
        agent = chai.request.agent(server)

        server.on('Started', () => {
            console.log('started server!')
            done()
        })
    })

    after((done) => {
        agent.close()
        done()
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
