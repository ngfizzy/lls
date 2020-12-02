import React, { FC, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FormState, IBook } from '../../../../../models'

interface Props {
    handleSubmit: (e: React.SyntheticEvent, arg: Partial<IBook>) => any;
    formState: FormState;
    error: string;
}
const BookForm: FC<Props> = ({ handleSubmit, formState, error }) => {
    const initialBook = {};

    const [book, setBook] = useState<Partial<IBook>>(initialBook);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>  {
        const value = e.target.value;
        const key = e.target.id;

        setBook(prevBook => {
            return {
                ...prevBook,
                [key]: value
            }
        });
    }

    return (
        <Form className="p-2 bg-light rounded" onSubmit={e => handleSubmit(e, book)}>
            {formState === 'error' ? <Alert variant="warning">{error}</Alert> : null}
            <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control 
                    value={book.title || ''}
                    onChange={e => handleOnChange(e)}
                    type="text" required={true} placeholder="Book Title" />
            </Form.Group>
            <Form.Group controlId="cover">
                <Form.Label>Book Cover Url</Form.Label>
                <Form.Control 
                    onChange={e => handleOnChange(e)}
                    value={book.cover || ''} type="text" placeholder="Book Cover Url" />
            </Form.Group>
            <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control 
                    onChange={e => handleOnChange(e)}
                    value={book.author || ''} type="text" placeholder="Author's Name" />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Book Description</Form.Label>
                <Form.Control 
                    onChange={e => handleOnChange(e)}
                    value={book.description || ''} as="textarea" type="text" placeholder="Book Description" />
            </Form.Group>

            <Form.Group controlId="summary">
                <Form.Label>Book Summary</Form.Label>
                <Form.Control
                    onChange={e => handleOnChange(e)}
                    value={book.summary || ''} as="textarea" type="text" placeholder="Book Summary" />
            </Form.Group>

            <Form.Group controlId="author">
                <Form.Label>Copies</Form.Label>
                <Form.Control
                    onChange={e => handleOnChange(e)}
                    value={book.copies || 1} type="number" placeholder="Number of Copies" />
            </Form.Group>

            <Button className="p-inline-block w-100" variant="primary" type="submit">
                Add
            </Button>
    </Form>
    )
}

export default BookForm; 
