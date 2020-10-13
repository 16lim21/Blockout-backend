// Followed tutorial from https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai#a-better-test
// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index.js')
chai.should()
chai.use(chaiHttp)
// Our parent block
describe('User', () => {
  describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          if (err) {
            console.log(err)
            done()
          }
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('/POST user', () => {
    it('it should POST a user ', (done) => {
      chai.request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({ username: 'user3', password: 'user3password' })
        .end((err, res) => {
          if (err) {
            console.log(err)
            done()
          }
          res.should.have.status(200)
          res.body.should.have.property('username')
          res.body.should.have.property('password')
          done()
        })
    })
  })

  describe('/GET/:id user', () => {
    it('it should GET a user given the id', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          if (err) {
            console.log(err)
            done()
          }
          chai.request(server)
            .get('/api/users/' + res.body.pop()._id)
            .end((err, res) => {
              if (err) {
                console.log(err)
                done()
              }
              res.should.have.status(200)
              res.body.should.have.property('username')
              res.body.should.have.property('password')
              res.body.should.have.property('username', 'user3')
              done()
            })
        })
    })
  })

  describe('/PATCH/:id user', () => {
    it('it should PATCH a user given the id', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          if (err) {
            console.log(err)
            done()
          }
          chai.request(server)
            .patch('/api/users/' + res.body.pop()._id)
            .send({ username: 'user4' })
            .end((err, res) => {
              if (err) {
                console.log(err)
                done()
              }
              res.should.have.status(200)
              res.body.should.have.property('username')
              res.body.should.have.property('password')
              done()
            })
        })
    })
  })

  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          if (err) {
            console.log(err)
            done()
          }
          chai.request(server)
            .delete('/api/users/' + res.body.pop()._id)
            .end((err, res) => {
              if (err) {
                console.log(err)
                done()
              }
              res.should.have.status(204)
              done()
            })
        })
    })
  })
})
