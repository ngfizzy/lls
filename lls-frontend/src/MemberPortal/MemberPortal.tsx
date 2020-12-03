
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { IUserBorrow } from '../../../models'
import { GeneralModal } from '../shared'
import Api from '../api'

import {AllBooks} from '../shared';
import {BorrowedBooks} from '../shared'

import './MemberPortal.css'
export default function MemberPortal() {

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
                setBorrows(data.borrows)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            })

    }, [])
    return (
        <Row className="ml-0 mr-0 border MemberPortal">
            <BorrowedBooks
                borrows={borrows}
                showBookDetails={handleShowModal}
            />
            <AllBooks
                showBookDetails={handleShowModal}
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
