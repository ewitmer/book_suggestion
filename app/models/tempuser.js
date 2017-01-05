/**
  * The TempUser is created when a user is going through the on-boarding process to temporarily
  * store the preferences and selections.
*/

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


