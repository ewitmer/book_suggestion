var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

server = require('../app/app');
var User = require('../app/models/user');

var should = chai.should();
chai.use(chaiHttp);


beforeEach(function(){
    var newUser = new User({
      category : "baby",
      bookLikes : ["babyA", "babyC", "babyE"],
      email : "test@user.com",
      firstName   : "Test",
      lastName    : "User" });
    newUser.save(function(err) {
    });
  });

describe('Users', function() {

  it('should delete a user on DELETE', function(done) {
    chai.request(server)
    .delete('/user/test@user.com')
    .end(function(err, res){
      res.should.have.status(201);
      });
    done();
    }); 
  
  //add test to make sure the user gets deleted.

  it('should edit a user on PUT', function(done) {
  chai.request(server)
    .put('/user/test@user.com')
    .send()
    .end(function(err, res){
      res.should.have.status(201);
      });
    done();
    }); 
});