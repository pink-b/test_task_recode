import { types } from "mobx-state-tree";

const Author = types.model("Author", {
  id: types.identifierNumber,
  name: types.optional(types.string, ""),
  booksIds: types.array(types.number),
});

const AuthorStore = types.model("AuthorStore", {
  authors: types.array(Author),
}).actions(self => ({
  addAuthor(authorId: number, authorName: string, bookIds: number[]) {
    self.authors.push(Author.create({ id: authorId, name: authorName, booksIds: bookIds }));
  },
  editAuthor(authorId: number, newAuthorName: string) {
    const author = self.authors.find(author => author.id === authorId);
    if (author) {
      author.name = newAuthorName;
    }
  },
  removeAuthor(authorId: number) {
    const authorIndex = self.authors.findIndex(author => author.id === authorId);
    if (authorIndex !== -1) {
      self.authors.splice(authorIndex, 1);
    }
  }
}));

export const authorStore = AuthorStore.create({
  authors: [],
});