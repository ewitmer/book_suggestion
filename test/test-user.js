const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

let server = require('../app/app');
let User = require('../app/models/user')


describe('Users', function() {

  User.collection.drop();

  beforeEach(function(done){
    var newUser = new User({
      category : "baby",
      bookLikes : ["babyA", "babyC", "babyE"],
      email : "test@user.com",
      firstName   : "Test",
      lastName    : "User" });

    newUser.save(function(err) {
      done();
    });
  });
  
  afterEach(function(done){
    User.collection.drop();
    done();
  });

/*  it('should delete a user on DELETE', function(done) {
  chai.request(server)
    .delete('/user/test@user.com')
    .end(function(err, res){
      res.should.have.status(201);
      done();
      });
    }); 

  it('should edit a user on PUT', function(done) {
  chai.request(server)
    .put('/user/test@user.com')
    .send()
    .end(function(err, res){
      res.should.have.status(201);
      done();
      });
    }); */

});


/*describe('User', function() {
  
  it('should save a user to the database', function(done){

    const user = {
      category : "baby",
      bookLikes : ["babyA", "babyC", "babyE"],
      email : "test@user.com",
      firstName   : "Test",
      lastName    : "User" };

    

  })

  it('should login a user in the database', function(done) {




  });

  it('should update a user book and category choices on PUT', function(done) {
    
    const user = {
      category : "baby",
      bookLikes : ["babyA", "babyC", "babyE"],
      email : "test@user.com",
      firstName   : "Test",
      lastName    : "User" };


    chai.request(server)
      .put('/user/test@user.com')
          .send(updated)
          .end(function(err, res) {
              res.should.have.status(201);
              res.body.should.be.a('object');

          });
      done();
  });


  it('should recipes on DELETE', function(done) {
    chai.request(server)
      // first have to get recipes so have `id` for one we want
      // to delete. Note that once we're working with databases later
      // in this course, we'll be able get the `id` of an existing instance
      // directly from the database, which will allow us to isolate the DELETE
      // logic under test from our GET interface
      .get('/recipes')
      .end(function(err, res) {
        chai.request(server)
            .delete(`/recipes/${res.body[0].id}`)
            .end(function(err, res) {
                res.should.have.status(204);
            });
      });
      done();
  });
  */