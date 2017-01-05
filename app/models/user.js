/**
  * The preferences from the TempUser instance are saved to the database when a user signs up
  * Email is validated so there is only one record per valid email address.
*/

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
         	validator: (v) => {
            	return /.+\@.+\..+/.test(v);
         	},
          	message: '{VALUE} is not a valid email'
        	}

     },
    firstName		: String,
    lastName		: String

});

const User = mongoose.model('User', UserSchema);

module.exports = User; 
