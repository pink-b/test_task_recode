import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import '../styles/AddBooks.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { authorStore } from 'store/AuthorStore';

const EditAuthor = observer(() => {
    const { authorId } = useParams<{ authorId: string }>();
    
    // Схема валидации
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Имя автора обязательно')
            .min(2, 'Имя должно содержать минимум 2 символа')
            .max(50, 'Имя не может превышать 50 символов'),
    });

    // Инициализация состояния формы
    const [initialValues, setInitialValues] = useState<{ name: string }>({ name: '' });

    useEffect(() => {
        const id = Number(authorId);
        const author = authorStore.authors.find(a => a.id === id);
        if (author) {
            setInitialValues({ name: author.name });
        }
    }, [authorId]);

    const handleSubmit = (values: { name: string }, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void; }) => {
        authorStore.editAuthor(Number(authorId), values.name);
        resetForm();
        setSubmitting(false);
        console.log("Форма отправлена");
    };

    return (
        <>
            <NavBar />
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true} // Позволяет обновить начальные значения при изменении authorId
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form-container">
                            <div>
                                <Field
                                    className="input-field"
                                    type="text"
                                    name="name"
                                    placeholder="Имя автора"
                                />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Обновить автора
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
});

export default EditAuthor;