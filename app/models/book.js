var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    isbn		: Number,
    title		: String,
    author		: String
    description	: String,
    cover		: String
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;