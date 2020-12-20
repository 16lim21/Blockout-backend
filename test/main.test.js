const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server/server')
chai.should()
chai.use(chaiHttp)

function importTest (name, path) {
    describe(name, () => {
        require(path)
    })
}

describe('Top level Test', () => {
    let requester
    before(() => {
        requester = chai.request(server).keepOpen()
    })

    after(() => {
        requester.close()
    })

    importTest('authTest', './auth.test')
    importTest('User Tests', './user.test')
    importTest('Todo Tests', './todo.test')
})
