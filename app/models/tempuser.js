class TempUser {
  constructor(category, email) {
    this.category = category;
    this.bookLikes = [];
    this.email = email
  }
  
  addLike(bookId, choiceIndex) {
    this.bookLikes[choiceIndex] = bookId;
  }
}

module.exports = TempUser;


