const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

let server = require('../app/app');

server.close();

beforeEach(function() {
  // create the server afresh for each test in this module
  server;

});


afterEach(function() {
  // close down the server at the end of each test in this module
  server.close();

});


describe('Category', function() {

  it('should list category options on GET', function(done) {

    chai.request(server)
      .get('/category')
      .end(function(err, res) {

        res.should.have.status(200);
        res.body.should.be.a('object');
        
        done();
      });
  });

  it('should add a category on POST', function(done) {

    const categoryReq = {categoryName : "baby"}

    chai.request(server)
      .post('/category')
      .send(categoryReq)
      .end(function(err, res) {
        res.should.have.status(200);
      });
      done();
  });

  it('should not add a category on POST if it is not defined in the list', function(done) {

    const categoryReq = {categoryName : "test"}

    chai.request(server)
      .post('/category')
      .send(categoryReq)
      .end(function(err, res) {
        res.should.have.status(404);
      });
      done();
  });
});










