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
    self.books.push(Book.create({ id: bookId, title: title, year: year, authorsIds: authorIds }));
    authorIds.forEach(authorId => {
      const authorIndex = authorStore.authors.findIndex(author => author.id === authorId);
      if (authorIndex !== -1) {
        authorStore.authors[authorIndex].booksIds.push(bookId);
      }
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
        const author = authorStore.authors.find(author => author.id === authorId);
        if (author) {
          const bookIndex = author.booksIds.indexOf(bookId);
          if (bookIndex !== -1) {
            author.booksIds.splice(bookIndex, 1);
          }
        }
      });

      newAuthorIds.forEach(authorId => {
        const author = authorStore.authors.find(author => author.id === authorId);
        if (author) {
          author.booksIds.push(bookId);
        }
      });
    }
  },
  removeBook(bookId: number) {
    const bookIndex = self.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      self.books.splice(bookIndex, 1);
      authorStore.authors.forEach(author => {
        const bookIdIndex = author.booksIds.indexOf(bookId);
        if (bookIdIndex !== -1) {
          author.booksIds.splice(bookIdIndex, 1);
        }
      });
    }
  }
}));

export const bookStore = BookStore.create({
  books: [],
});