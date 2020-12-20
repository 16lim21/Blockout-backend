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
    before(async () => {
        requester = chai.request(server).keepOpen()
        await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    after(() => {
        requester.close()
    })

    importTest('Authentication Tests', './auth.test')
    importTest('User Tests', './user.test')
    importTest('Todo Tests', './todo.test')
})
