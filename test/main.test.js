const chai = require('chai')
const chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)

function importTest (name, path) {
    describe(name, () => {
        require(path)
    })
}

describe('Top level Test', () => {
    let requester
    before(async function () {
        this.timeout(11000)
        const server = require('../server/server')
        requester = chai.request(server).keepOpen()
        await new Promise((resolve) => setTimeout(resolve, 10000))
    })

    after(() => {
        requester.close()
    })

    importTest('Authentication Tests', './auth.test')
    importTest('User Tests', './user.test')
    importTest('Todo Tests', './todo.test')
})
