import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SectionTitle from '../../../shared/SectionTitle/SectionTitle'

import Api from '../../api';
import Book from '../Book/Book';

export default function AllBooks() {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    console.log(isLoading, error)
    
    useEffect(() => {
        
        Api.getAllBooks()
            .then(({data}) => {
                setIsLoading(false);
                setBooks(data.books);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error.message)
            });
    }, []);

    return (
        <Col 
        as={'main'}
        sm={12}
        md={9}
        className="ml-auto "
        >
        <SectionTitle title={"All Books"} />

        <Row>
            {books.map(book => (
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Book book={book} />
                </Col>
            ))}
        </Row>
    
    </Col>
    )
}
