import React, { FC, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { IBook } from '../../../../models';

import Api from '../../api';
import {Book} from '..';
import { Section } from '../Section/Section';

interface Props {
    showBookDetails: (arg: {book: IBook}) => any;
    refetch?: boolean;
}




export const AllBooks: FC<Props> =  ({ showBookDetails, refetch })  => {
    const [books, setBooks] = useState<IBook[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    console.log(isLoading, error)

    const fetchAllBooks = () => {
        Api.getAllBooks()
        .then(({data}) => {
            setIsLoading(false);
            setBooks(data.books);
        })
        .catch(error => {
            setIsLoading(false);
            setError(error.message)
        });
    }
    useEffect(() => fetchAllBooks(), []);
    useEffect(() => {
        if (refetch) {
            fetchAllBooks()
        }
    }, [refetch])

    return (
        <Section
            dimensions={{
                sm:12,
                md:8
            }}
            title="All Books"
        >
        <Row>
            {books.map((book, i) => (
                <Col xs={12} sm={6} lg={4} className="mb-3" key={i}>
                    <Book book={book} showBook={showBookDetails}/>
                </Col>
            ))}
        </Row> 
    </Section>
    )
}
