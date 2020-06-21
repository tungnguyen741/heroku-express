//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('QLTV', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET BOOKS', () => {
        it('it should GET all the BOOKS', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                   // res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });

  describe('/GET USERS', () => {
    it('it should GET all the USERS', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
               // res.body.length.should.be.eql(9); // fixme :)
                done();
            });
    });
});

describe('/GET TRANSACTION', () => {
  it('it should GET all the TRANSACTION', (done) => {
      chai.request(server)
          .get('/api/transactions')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
             // res.body.length.should.be.eql(9); // fixme :)
              done();
          });
  });
});

// describe('/GET LOGIN', () => {
//     it('it should GET in api/Login/me', (done) => {
//         chai.request(server)
//             .get('/api/login/me')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 // res.body.should.be.a('array');
//                // res.body.length.should.be.eql(9); // fixme :)
//                 done();
//             });
//     });
//   });

});