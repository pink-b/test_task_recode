import { observer } from 'mobx-react-lite';
import '../styles/AddBooks.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';
import { authorStore } from 'store/AuthorStore';

const AddAuthor = observer(() => {
    const idGenerator = (() => {
        const lastAuthorId: number = authorStore.authors.length > 0 ? authorStore.authors.at(-1)!.id : -1;
        return lastAuthorId + 1;
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Имя автора обязательно')
            .min(2, 'Имя должно содержать минимум 2 символа')
            .max(50, 'Имя не может превышать 50 символов'),
    });

    return (
        <>
            <NavBar />
            <div>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        authorStore.addAuthor(idGenerator(), values.name, []);
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
                                    name="name"
                                    placeholder="Имя"
                                />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Добавить автора
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
});

export default AddAuthor;