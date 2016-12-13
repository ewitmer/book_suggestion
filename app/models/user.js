var mongoose = require('mongoose');
var validator = require('validator');

var UserSchema = new mongoose.Schema({
    category        : String,
    bookLikes       : [String],
    email: { 
	    type: String,
	    trim: true,
	    lowercase: true,
	    unique: true,
	    required: true,
	    validate: [ validator.isEmail, 'invalid email' ]
	},
    firstName		: String,
    lastName		: String

});

var User = mongoose.model('User', UserSchema);

module.exports = User; 
