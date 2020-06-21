//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('QLTV', () => {
    // beforeEach((done) => {
    //     //Before each test we empty the database in your case
    //     done();
    // });

// Test the /GET route
//     describe('/GET BOOKS', () => {
//         it('it should GET all the BOOKS', (done) => {
//             chai.request(server)
//                 .get('/api/books')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.should.be.json;
//                     res.body.should.be.a('array');
//                     done();
//                 });
//         });
//     });

//     describe('/GET USERS', () => {
//         it('it should GET all the USERS', (done) => {
//             chai.request(server)
//                 .get('/api/users')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.should.be.json;
//                     res.body.should.be.a('array');
//                     done();
//                 });
//         });
//     });

//     describe('/GET TRANSACTION', () => {
//     it('it should GET all the TRANSACTION', (done) => {
//         chai.request(server)
//             .get('/api/transactions')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.should.be.json;
//                 res.body.should.be.a('array');
//                 done();
//             });
//         });
//     });

// // Test the /POST route
// describe('/POST BOOKS', () => {
//     it('it should POST a single BOOKS on /BOOKS', (done) => {
//         let book = {
//             "title": "Túp Lều Bác Tôm (PHẦN 2)2",
//             "image": "https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_86539.jpg",
//             "description": "test description"
//         };
//         chai.request(server)
//           .post('/api/books')
//           .send(book)
//           .end( (err, res)=>{
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             res.body.should.have.property('_id');
//             res.body.should.have.property('title');
//             res.body.should.have.property('image');
//             res.body.should.have.property('description');
//             res.body.image.should.equal('https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/i/m/image_86539.jpg');
//             res.body.title.should.equal('Túp Lều Bác Tôm (PHẦN 2)2');
//             res.body.description.should.equal('test description');
//             done();
//           });
//       });
//     });

    describe('/POST USER LOGIN', () => {
        it('it should POST a single BOOKS on /BOOKS', (done) => {
            let user = {
                "email": "duy@gmail.com",
                "password": "Giaduy123",
            };
            chai.request(server)
              .post('/api/login')
              .send(user)
              .end( (err, res)=>{
                res.should.have.status(200);
                res.should.be.json;
                done();
              });
          });
        });




});