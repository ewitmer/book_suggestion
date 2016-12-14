var mongoose = require('mongoose');

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

var UserSchema = new mongoose.Schema({
    category        : String,
    bookLikes       : [String],
    email: { 
	    type: String,
	    trim: true,
	    lowercase: true,
	    unique: true,
	    required: true,
	    validate: [ validateEmail, 'invalid email' ]
	},
    firstName		: String,
    lastName		: String

});

var User = mongoose.model('User', UserSchema);

module.exports = User; 
