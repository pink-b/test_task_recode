import React from 'react';
import { observer } from 'mobx-react-lite';

import '../styles/AddBooks.css';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';
import { bookStore } from 'store/BookStore';
import { authorStore } from 'store/AuthorStore';

const AddBook = observer(() => {
    const [authors, setAuthors] = useState<(number)[]>([]);

    const idGenerator = (() => {
        const lastBookId: number = bookStore.books.length > 0 ? bookStore.books.at(-1)!.id : -1;
        return lastBookId + 1;
    });

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Название книги обязательно'),
        year: Yup.number()
            .required('Год издания обязателен')
            .min(1900, 'Год должен быть больше 1900')
            .max(new Date().getFullYear(), 'Год не может быть больше текущего'),
    });

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
                <Formik
                    initialValues={{ title: '', year: '', authors: [] }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        bookStore.addBook(idGenerator(), values.title, Number(values.year), authors);
                        resetForm();
                        setSubmitting(false);
                        console.log("Форма отправлена");
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form-container">
                            <div>
                                <Field
                                    className="input-field"
                                    type="text"
                                    name="title"
                                    placeholder="Название"
                                />
                                <ErrorMessage name="title" component="div" className="error" />
                            </div>
                            <div>
                                <Field
                                    className="input-field"
                                    type="text"
                                    name="year"
                                    placeholder="Год издания"
                                />
                                <ErrorMessage name="year" component="div" className="error" />
                            </div>
                            <div>
                                <label htmlFor="authors">Список авторов</label>
                                <select id="authors" multiple={true} name="authors" onChange={authorsSelectHandleChange}>
                                    {authorStore.authors.map((el) => (
                                        <option key={el.id} data-id={el.id} value={el.name}>{el.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Добавить книгу
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
});

export default AddBook;