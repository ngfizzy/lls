import React, { FC, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { IBook } from '../../../../models';

import {Book} from '..';
import { Section } from '../Section/Section';
import { fetchAllBooks } from '../../helpers';

interface Props {
    showBookDetails: (arg: {book: IBook}) => any;
    refetch?: boolean;
    adminView?: boolean;
}

export const AllBooks: FC<Props> =  ({ showBookDetails, refetch, adminView })  => {
    const [books, setBooks] = useState<IBook[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    console.log(isLoading, error)

    useEffect(() => {
        fetchAllBooks({setBooks, setIsLoading, setError})
    }, []);
    useEffect(() => {
        if (refetch) {
            fetchAllBooks({setBooks, setIsLoading, setError});
        }
    }, [refetch, books]);

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
                    <Book
                        isAdmin={adminView}
                        book={book}
                        showBook={showBookDetails}
                        deleteBook={() => {}}
                    />
                </Col>
            ))}
        </Row> 
    </Section>
    )
}
