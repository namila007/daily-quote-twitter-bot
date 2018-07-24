let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test the /ping route
  */
  describe('/ping', () => {
      it('it should return 200', (done) => {
        chai.request(app)
            .get('/ping')
            .end((err, res) => {
                res.should.have.status(200);
              done()
            })
      })
  })

  //test count
  describe('/count', () => {
    it('it should return object', (done) => {
      chai.request(app)
          .get('/ping')
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.a('object')
            done()
          })
    })
  })
  
    //test quote
    describe('/quote', () => {
      it('it should return object', (done) => {
        chai.request(app)
            .get('/quote')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.a('object')
              done()
            })
      })  
    })

