import React from 'react';
import { observer } from 'mobx-react-lite';
import { bookStore } from 'store/BookStore';
import { authorStore } from 'store/AuthorStore';
import '../styles/AddBooks.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';

const AddAuthor = observer(() => {
    const idGenerator = (() => {
        const lastAuthorId: number = authorStore.authors.length > 0 ? authorStore.authors.at(-1)!.id : -1;
        return lastAuthorId + 1;
    });

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Имя обязательно')
        }),
        onSubmit: (values) => {
            authorStore.addAuthor(idGenerator(), values.name, []);
            formik.resetForm();
            console.log("Форма отправлена");
        }
    });

    return (
        <>
            <NavBar />
            <div>
                <form className="form-container" onSubmit={formik.handleSubmit}>
                    <input 
                        className="input-field" 
                        type="text" 
                        placeholder="Имя"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                    ) : null}
                    
                    <button type="submit">
                        Добавить автора
                    </button>
                </form>
            </div>
        </>
    );
});

export default AddAuthor;