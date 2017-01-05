class TempUser {
  constructor(category, email) {
    this.category = category;
    this.bookLikes = [];
    this.email = email
    this.bookRecs = [];
  }
  
  addLike(bookId, choiceIndex) {
    this.bookLikes[choiceIndex] = bookId;
  }

  addRec(bookId) {
  	this.bookRecs.push(bookId);
  }
}

module.exports = TempUser;


