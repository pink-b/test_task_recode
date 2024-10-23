import { types } from "mobx-state-tree";
import { authorStore } from "./AuthorStore";

const Book = types.model("Book", {
  id: types.identifierNumber,
  title: types.optional(types.string, ""),
  year: types.number,
  authorsIds: types.array(types.number),
});

const BookStore = types.model("BookStore", {
  books: types.array(Book),
}).actions(self => ({
  addBook(bookId: number, title: string, year: number, authorIds: number[]) {
    const newBook = Book.create({ id: bookId, title, year, authorsIds: authorIds });
    self.books.push(newBook);
    
    authorIds.forEach(authorId => {
      authorStore.addBookId(authorId, bookId);
    });
  },
  
  editBook(bookId: number, newTitle: string, newYear: number, newAuthorIds: number[]) {
    const book = self.books.find(book => book.id === bookId);
    if (book) {
      const oldAuthorIds = book.authorsIds.slice();
      book.title = newTitle; 
      book.year = newYear;  
      book.authorsIds.replace(newAuthorIds);

      oldAuthorIds.forEach(authorId => {
        authorStore.removeBookId(authorId, bookId);
      });

      newAuthorIds.forEach(authorId => {
        authorStore.addBookId(authorId, bookId);
      });
    }
  },
  
  removeBook(bookId: number) {
    const bookIndex = self.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const book = self.books[bookIndex];
      self.books.splice(bookIndex, 1);
      
      book.authorsIds.forEach(authorId => {
        authorStore.removeBookId(authorId, bookId);
      });
    }
  }
}));

export const bookStore = BookStore.create({
  books: [],
});