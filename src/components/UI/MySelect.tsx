import React from 'react';
import { authorStore } from 'store/AuthorStore';

const MySelect = () => {
    return (
        <div>
            <select style={{width: 100, marginBottom: 10}}>
            {authorStore.authors.map((author) => {
              return <option value={"${author.name}"}>author.name</option>
            })}
          </select>
        </div>
    );
};

export default MySelect;