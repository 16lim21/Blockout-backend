// const ToDoService = require('../server/services/todo-service')
const AuthService = require('../server/services/auth-service')
const CalendarService = require('../server/services/calendar-service')
const sinon = require('sinon')
const chai = require('chai')
chai.should()
const moment = require('moment')
const expect = chai.expect

let server
if (!process.env.SERVER_URL) {
    server = 'http://localhost:3001'
} else {
    server = process.env.SERVER_URL
}

describe('Testing Todo service and routes', function () {
    let agent
    let testId
    before(() => {
        agent = chai.request.agent(server)
    })

    after(() => {
        agent.close()
    })

    describe('Test /blockout/api/todo controller and routes', () => {
        it('Should Login with fake user idtoken', (done) => {
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
                    done()
                })
                .catch((error) => {
                    console.log(error)
                    done()
                })
        })

        it('Should get todo events for the test user', (done) => {
            agent
                .get('/api/blockout/todo')
                .then((response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    done()
                })
                .catch((error) => {
                    console.log(error)
                    done()
                })
        })

        it('Should post new todo event for the test user', (done) => {
            sinon
                .stub(CalendarService.prototype, 'postEvents')
                .callsFake((event, calendarId) => {
                    return '123' // Returns fake event id
                })

            const deadline = moment.utc().format('YYYY-MM-DD[T]hh:mm')
            const todo = {
                name: 'This is a unit test event',
                duration: 1,
                deadline: deadline
            }

            agent
                .post('/api/blockout/todo')
                .send(todo)
                .then((response) => {
                    response.should.have.status(200)
                    response.body.should.have.property('_id')
                    response.body.should.have.property('name')
                    response.body.should.have.property('duration')
                    response.body.should.have.property('deadline')
                    response.body.should.have
                        .property('events')
                        .that.is.a('array')
                    testId = response.body._id
                    done()
                })
                .catch((error) => {
                    console.log(error)
                    done()
                })
        })

        it('Should delete the todo test event for the test user', (done) => {
            sinon
                .stub(CalendarService.prototype, 'deleteEvent')
                .callsFake((eventId, calendarId) => {})

            agent
                .delete(`/api/blockout/todo/${testId}`)
                .then((response) => {
                    response.should.have.status(204)
                    done()
                })
                .catch((error) => {
                    console.log(error)
                    done()
                })
        })
    })
})
