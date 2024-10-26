import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import '../styles/AddBooks.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { bookStore } from 'store/BookStore';
import { authorStore } from 'store/AuthorStore';

const EditBook = observer(() => {
    const { bookId } = useParams<{ bookId: string }>();
    const [initialValues, setInitialValues] = useState<{ title: string; year: string }>({ title: '', year: '' });
    const [authors, setAuthors] = useState<number[]>([]);

    useEffect(() => {
        const id = Number(bookId);
        const book = bookStore.books.find(b => b.id === id);
        if (book) {
            setInitialValues({ title: book.title, year: book.year.toString() });
            setAuthors(book.authorsIds);
        }
    }, [bookId]);

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Название книги обязательно'),
        year: Yup.number()
            .required('Год издания обязателен')
            .min(1900, 'Год должен быть больше 1900')
            .max(new Date().getFullYear(), 'Год не может быть больше текущего'),
    });

    const handleSubmit = (values: { title: string; year: string }, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void; }) => {
        bookStore.editBook(Number(bookId), values.title, Number(values.year), authors);
        resetForm();
        setSubmitting(false);
        console.log("Форма отправлена");
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
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true} // Позволяет обновить начальные значения при изменении bookId
                    onSubmit={handleSubmit}
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
                                    placeholder="Год"
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
                                Обновить книгу
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
});

export default EditBook;