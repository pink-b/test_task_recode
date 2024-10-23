import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import '../styles/AddBooks.css';
import { FormEvent, ChangeEvent } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { authorStore } from 'store/AuthorStore';

const EditAuthor = observer(() => {
    const { authorId } = useParams<{ authorId: string }>();
    const [formState, setFormState] = useState<{ name: string;}>({ name: ''});

    useEffect(() => {
        const id = Number(authorId);
        const author = authorStore.authors.find(a => a.id === id);
        if (author) {
            setFormState({ name: author.name});
        }
    }, [authorId]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authorStore.editAuthor(Number(authorId), formState.name);
        setFormState({ name: ''});
        console.log("Форма отправлена");
    };

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <NavBar />
            <div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Имя автора"
                        value={formState.name}
                        name="name"
                        onChange={onChange}
                    />
                    <button type="submit">
                        Обновить автора
                    </button>
                </form>
            </div>
        </>
    );
});

export default EditAuthor;