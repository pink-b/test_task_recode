import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import '../styles/AddBooks.css';
import { FormEvent, ChangeEvent } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { bookStore } from 'store/BookStore';
import { authorStore } from 'store/AuthorStore';

const EditBook = observer(() => {
    const { bookId } = useParams<{ bookId: string }>();
    const [formState, setFormState] = useState<{ title: string; year: string }>({ title: '', year: '' });
    const [authors, setAuthors] = useState<number[]>([]);

    useEffect(() => {
        const id = Number(bookId);
        const book = bookStore.books.find(b => b.id === id);
        console.log(id)
        console.log(book)
        if (book) {
            setFormState({ title: book.title, year: book.year.toString() });
            setAuthors(book.authorsIds);
        }
    }, [bookId]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(bookId)
        bookStore.editBook(Number(bookId), formState.title, Number(formState.year), authors);
        setFormState({ title: '', year: '' });
        console.log("Форма отправлена");
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const authorsSelectHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => {
            return {
                name: option.value,
                id: Number(option.getAttribute('data-id'))
            };
        });

        const selectedIds = Array.from(new Set(selectedOptions.map(option => option.id)));
        setAuthors(selectedIds);
    };

    return (
        <>
            <NavBar />
            <div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Название"
                        value={formState.title}
                        name="title"
                        onChange={onChange}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Год"
                        value={formState.year}
                        name="year"
                        onChange={onChange}
                    />
                    <div>
                        <label htmlFor="example-getting-started">Список авторов</label>
                        <select id="example-getting-started" multiple={true} name="authors" onChange={authorsSelectHandleChange}>
                            {authorStore.authors.map((el) => (
                                <option key={el.id} data-id={el.id} value={el.name}>{el.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">
                        Обновить книгу
                    </button>
                </form>
            </div>
        </>
    );
});

export default EditBook;