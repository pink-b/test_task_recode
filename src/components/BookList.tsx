import { observer } from 'mobx-react-lite';
import { bookStore } from 'store/BookStore';
import { authorStore } from 'store/AuthorStore';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import EditButton from './UI/EditButton';
import DeleteButton from './UI/DeleteButton';
import { useMemo, useState } from 'react';
import MyInput from './UI/MyInput'

const BookList = observer(() => {

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const sortedBooks = bookStore.books?.slice().sort((a, b) => a.title.localeCompare(b.title))

  const searchBooks = useMemo(() => {
    return sortedBooks.filter(book => book.title.includes(searchQuery))
  }, [searchQuery, sortedBooks])

  const deleteBook = (id: number) => {
    bookStore.removeBook(id);
  };

  const handleEditClick = (id: number) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <>
      <NavBar />
      <div>
        <h2>Список книг</h2>
        <MyInput
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Enter book name"
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Автор(ы)</th>
              <th>Год издания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {searchBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>
                  {book.authorsIds.reduce((accumulator: string, currentValue: number, index: number) => {
                    const author = authorStore.authors.find((author) => author.id === currentValue);
                    if (author) {
                      const authorName = author.name;
                      return index === 0 ? authorName : accumulator + ", " + authorName;
                    }
                    return accumulator;
                  }, "")}
                </td>
                <td>{book.year}</td>
                <td colSpan={2}>
                  <EditButton onClick={handleEditClick} id={book.id} />
                  <DeleteButton onDelete={deleteBook} id={book.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default BookList;