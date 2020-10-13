var assert = require("assert");
require("../index.js");
describe("placeholder", function () {
    it("shold return true", function () {
        assert.equal(1, 1);
    });
});

// let mongoose = require("mongoose");
// let Book = require('../models/user');

// //Require the dev-dependencies
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');
// let should = chai.should();

// chai.use(chaiHttp);
// //Our parent block
// describe('Books', () => {
//   describe('/GET book', () => {
//       it('it should GET all the books', (done) => {
//         chai.request(server)
//             .get('/book')
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('array');
//               done();
//             });
//       });
//   });

// });
