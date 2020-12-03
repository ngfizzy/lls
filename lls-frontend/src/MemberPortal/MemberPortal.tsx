
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { IBook, IUserBorrow } from '../../../models'
import { GeneralModal } from '../shared'
import Api from '../api'

import {AllBooks} from '../shared';
import {BorrowedBooks} from '../shared'

import './MemberPortal.css'
export default function MemberPortal({userId}: {userId: number}) {

    const [borrows, setBorrows] = useState<IUserBorrow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<IUserBorrow>>();


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: Partial<IUserBorrow>) => {
        setShowModal(true);
        setSelectedBook(fullBook);
    }

    console.log(isLoading, error)
    useEffect(() => {
            Api.getBorrows()
            .then(({data}) => {
                setBorrows(data.loans)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            })
    }, []);

    const borrowBook = (book: IBook) => {
        Api.createLoan({
            userId,
            bookId: book.id,
            days: 7,
        });
    }
    return (
        <Row className="ml-0 mr-0 border MemberPortal">
            <BorrowedBooks
                borrows={borrows}
                showLoan={handleShowModal}
            />
            <AllBooks
                showBookDetails={handleShowModal}
                borrow={borrowBook}
            />

            <GeneralModal 
                handleClose={handleCloseModal} 
                title={selectedBook?.book?.title!}
                show={showModal}
                size="lg"
            >
                <div>{JSON.stringify(selectedBook)}</div>
            </GeneralModal>
        </Row>
    )
}
