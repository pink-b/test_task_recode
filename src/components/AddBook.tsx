import React from 'react';
import { observer } from 'mobx-react-lite';
import { bookStore } from 'store/BookStore';
import { authorStore } from 'store/AuthorStore';
import '../styles/AddBooks.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';

const AddBook = observer(() => {
    const idGenerator = (() => {
        const lastBookId: number = bookStore.books.length > 0 ? bookStore.books.at(-1)!.id : -1;
        return lastBookId + 1;
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            year: '',
            authors: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Название обязательно'),
            year: Yup.number()
                .required('Год обязателен')
                .min(1900, 'Год должен быть больше 1900')
                .max(new Date().getFullYear(), 'Год не может быть больше текущего'),
            authors: Yup.array().min(1, 'Выберите хотя бы одного автора')
        }),
        onSubmit: (values) => {
            bookStore.addBook(idGenerator(), values.title, Number(values.year), values.authors);
            formik.resetForm();
            console.log("Форма отправлена");
        }
    });

    const authorsSelectHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => {
            return {
                name: option.value,
                id: Number(option.getAttribute('data-id'))
            };
        });

        const selectedIds = Array.from(new Set(selectedOptions.map(option => option.id)));

        formik.setFieldValue('authors', selectedIds);
        console.log("Обновленные идентификаторы авторов:", selectedIds);
    };

    return (
        <>
            <NavBar />
            <div>
                <form className="form-container" onSubmit={formik.handleSubmit}>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Название"
                        {...formik.getFieldProps('title')}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error">{formik.errors.title}</div>
                    ) : null}

                    <input
                        className="input-field"
                        type="text"
                        placeholder="Год"
                        {...formik.getFieldProps('year')}
                    />
                    {formik.touched.year && formik.errors.year ? (
                        <div className="error">{formik.errors.year}</div>
                    ) : null}

                    <div>
                        <label htmlFor="example-getting-started">Список авторов</label>
                        <select
                            id="example-getting-started"
                            multiple={true}
                            name="authors"
                            onChange={authorsSelectHandleChange}
                            onBlur={formik.handleBlur}
                        >
                            {authorStore.authors.map((el) => {
                                return <option key={el.id} data-id={el.id} value={el.name}>{el.name}</option>;
                            })}
                        </select>
                        {formik.touched.authors && formik.errors.authors ? (
                            <div className="error">{formik.errors.authors}</div>
                        ) : null}
                    </div>

                    <button type="submit">
                        Добавить книгу
                    </button>
                </form>
            </div>
        </>
    );
});

export default AddBook;