// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from 'components/AddAuthors';
import AuthorsList from './components/AuthorsList';
import EditBook from 'components/EditBook';
import EditAuthor from 'components/EditAuthor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList/>} />
        <Route path="/authors" element={<AuthorsList/>}/>
        <Route path="/add-book" element={<AddBook/>} />
        <Route path="/add-authors" element={<AddAuthor/>} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/edit-author/:authorId" element={<EditAuthor />} />
      </Routes>
    </Router>
  );
};

export default App;