//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const Book = require('../Models/data.model');
const Transaction = require('../Models/transaction.model');
const User = require('../Models/user.model');
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
//Test the /GET route
    describe('/GET BOOKS', () => {
        it('it should GET all the BOOKS', (done) => {
            let book = new Book({
                title: "Những Cuộc Phiêu Lưu Của Tom Sawyer",
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/400x400/9df78eab33525d08d6e5fb8d27136e95/8/9/8936067596403.jpg?fbclid=IwAR0m93sle66BuASlvb9ZuHzKwPZhYPTDdh7yfYO9-AWxpaVampb5G2LoUEU",
                description: "Mark Twain tên thật là Samuel Clemens(1835-1910) sinh trưởng ở miền Florida, thuộc bang Missouri, nước Mỹ, là một nhà văn trào phúng nổi tiếng. Tác phẩm của ông, với tính cách châm biếm sâu sắc với những nét miêu tả tâm lý xã hội cực kỳ khéo léo, đã trở thành vũ khí sắc bén đấu tranh chống lại sự áp bức thống trị của nhà cầm quyền phong kiến tư bản.  Ra đời năm 1876, hơn 100 năm nay, Những cuộc phiêu lưu của Tom Sawyer đã được người đọc ở nhiều lứa tuổi, nhiều dân tộc khác nhau yêu mến. Tác giả không chỉ thuật lại câu chuyện có hậu về chú Tom tinh nghịch, mà còn dựng nên một bức tranh hiện thực về cuộc sống của các nhân vật bé nhỏ trong truyện, đặc biệt đi sâu vào thế giới bên trong con người, miêu tả giản di và chính xác tâm lí trẻ em. Tác phẩm chứa đựng trong nó một chất thơ trong trẻo, được coi là một “khúc ca về tuổi thơ”"
                });
                book.save((err, book)=>{
                chai.request(server)
                .get('/api/books'+book.id)
                .send(book)
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('image');
                    res.body.should.have.property('description');
                    res.body.should.have.property('_id').eql(book.id);
                    done();
                });
        });
    });
});
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
      it('it should POST a single BOOKS on /LOGIN', (done) => {
          let user = {
                "email": "duy@gmail.com",
                "password": "Giaduy1234"
           };
          chai.request(server)
            .post('/api/login')
            .send(user)
            .end( (err, res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.should.be.json;
              done();
            });
        });
      });




});