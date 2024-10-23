import { observer } from 'mobx-react-lite';

import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { authorStore } from 'store/AuthorStore';
import EditButton from './UI/EditButton';
import DeleteButton from './UI/DeleteButton';
import { useMemo, useState } from 'react';
import MyInput from './UI/MyInput'
import { bookStore } from 'store/BookStore';
import MySelect from './UI/MySelect';

const AuthorsList = observer(() => {

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const sortedAuthors = authorStore.authors?.slice().sort((a, b) => a.name.localeCompare(b.name))

  const searchAuthors = useMemo(() => {
    return sortedAuthors.filter(author => author.name.includes(searchQuery))
  }, [searchQuery, sortedAuthors])

  const deleteAuthor = (id: number) => {
    authorStore.removeAuthor(id)
  }

  const handleEditClick = (id: number) => {
    navigate(`/edit-author/${id}`);
  }
  
  return (
    <>
    <NavBar/>
    <div>
      <h2>Список авторов</h2>
      {/* <MySelect/> */}
      <MyInput
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Enter author name"
        />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Количество книг</th>
          </tr>
        </thead>
        <tbody>
          {searchAuthors.map(author => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.booksIds?.reduce((accumulator: string, currentValue: number, index: number) => {
                  const bookTitle = bookStore.books[currentValue]?.title;
                  return index === 0 ? bookTitle : accumulator + ", " + bookTitle;
                }, "")}</td>
                <td style={{}}>
                {author.booksIds.length}
              </td>
                <td colSpan={2}>
                  <EditButton onClick={handleEditClick} id={author.id}/>
                  <DeleteButton onDelete={deleteAuthor} id={author.id}/>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
});

export default AuthorsList;