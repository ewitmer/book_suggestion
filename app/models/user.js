var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    category        : String,
    bookLikes       : [String],
    bookRecs       : [String],
    
	email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'User email required'],
        validate: {
         	validator: function(v) {
            	return /.+\@.+\..+/.test(v);
         	},
          	message: '{VALUE} is not a valid email'
        	}

     },
    firstName		: String,
    lastName		: String

});

var User = mongoose.model('User', UserSchema);

module.exports = User; 
