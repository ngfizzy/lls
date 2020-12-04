
import React, { useEffect, useState } from 'react'
import { Alert, Row } from 'react-bootstrap'
import { IBook, ILoan } from '../../../../models'
import { GeneralModal } from '../../shared'
import Api from '../../api'

import {AllBooks} from '../../shared';
import {BorrowedBooks} from '../../shared'

import './MemberPortal.css'
import LoanDetails from '../../shared/LoanTable/LoanDetails';
import { Section } from '../../shared/Section/Section'


export default function MemberPortal({userId}: {userId: number}) {

    const [loans, setBorrows] = useState<ILoan[]>([]);
    const [shouldFetchLoans, setShouldFetchLoans] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [shouldShowLoan, setShouldShowLoan]  = useState(false);
    const [loan, setLoan] = useState<Partial<ILoan>>();


    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<ILoan>>();


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: Partial<ILoan>) => {
        setShowModal(true);
        setSelectedBook(fullBook);
    }

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

    const showLoan = (loanToShow: Partial<ILoan>) => {
        setShouldShowLoan(true);
        setLoan(loanToShow)
    }


    const completeLoan = (loan: ILoan) => {
        Api.completeLoan(loan)
            .then(({data}) => {

                setShouldFetchLoans(!data.error);
                if(data.error) {
                    setError(data.message)
                }
            })
            .catch((error: { message: React.SetStateAction<string>; }) => {
                setError(error.message)
            })
            .finally(() => {
                setShouldShowLoan(false);
                setLoan({});
            });
    }

    return (
        <>
         <Row>
            <Section title="Welcome to member portal" dimensions={{xs: 12}}>

                {error? <Alert variant="warning">{error}</Alert>: null}
                {isLoading? <Alert variant="info">Loading....</Alert>: null}
            </Section>
        </Row>
        <Row className="ml-0 mr-0 border MemberPortal">
            <BorrowedBooks
                borrows={loans}
                showLoan={showLoan}
            />
            <AllBooks
                showBookDetails={handleShowModal}
                borrow={borrowBook}
            />

            <GeneralModal 
                handleClose={() => setShouldShowLoan(false)}
                title={loan?.book?.title!}
                show={shouldShowLoan}
                size="lg"
                controls="closeOnly"
            >
                <LoanDetails 
                    loan={loan as ILoan}
                    completeLoan={completeLoan}
                />
            </GeneralModal>

            <GeneralModal 
                handleClose={handleCloseModal} 
                title={selectedBook?.book?.title!}
                show={showModal}
                size="lg"
            >
                <LoanDetails
                    hideControls={true} 
                    loan={{book: selectedBook} as ILoan} />
            </GeneralModal>
        </Row>
        </>
    )
}
