import React, { FC, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { IBook } from '../../../../models';
import Api from '../../api';

import {Book} from '..';
import { Section } from '../Section/Section';
import { fetchAllBooks } from '../../helpers';

interface Props {
    showBookDetails: (arg: {book: IBook}) => any;
    refetch?: boolean;
    adminView?: boolean;
    borrow: (arg: IBook) => any;
}


export const AllBooks: FC<Props> =  ({ showBookDetails, refetch, adminView, borrow })  => {
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


    const deleteMe = async (book: IBook) => {
        Api.deleteBook(book.id)
            .then(()=> {
                setBooks(prevBooks=> prevBooks.filter(nextBook => book.id !== nextBook.id ))
            });
    }

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
                        borrow={borrow}
                        isAdmin={adminView}
                        book={book}
                        showBook={showBookDetails}
                        deleteBook={() => deleteMe(book)}
                    />
                </Col>
            ))}
        </Row> 
    </Section>
    )
}
