
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { IBook, ILoan } from '../../../../models'
import { GeneralModal } from '../../shared'
import Api from '../../api'

import {AllBooks} from '../../shared';
import {BorrowedBooks} from '../../shared'

import './MemberPortal.css'
import LoanDetails from '../../shared/LoanTable/LoanDetails'
export default function MemberPortal({userId}: {userId: number}) {

    const [borrows, setBorrows] = useState<ILoan[]>([]);
    const [shouldFetchLoans, setShouldFetchLoans] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<ILoan>>();


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: Partial<ILoan>) => {
        setShowModal(true);
        setSelectedBook(fullBook);
    }

    console.log(isLoading, error)
    useEffect(() => {
        if(shouldFetchLoans) {
            Api.getBorrows()
            .then(({data}) => {
                setBorrows(data.loans)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            }).finally(() => setShouldFetchLoans(false))
        }
          
    }, [shouldFetchLoans]);

    const borrowBook = (book: IBook) => {
        Api.createLoan({
            userId,
            bookId: book.id,
            days: 7,
        }).then(({data}) => {
            setShouldFetchLoans(!data.error);
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
                <LoanDetails hideControls={true} loan={{book: selectedBook} as ILoan} />
            </GeneralModal>
        </Row>
    )
}
