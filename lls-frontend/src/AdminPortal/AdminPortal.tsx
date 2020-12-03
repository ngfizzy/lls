import React, { FC, useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import {FormState, IBook, ILoan } from '../../../models';
import Api from '../api';
import { AllBooks, BorrowedBooks, GeneralModal } from '../shared';
import LoanDetails from '../shared/LoanTable/LoanDetails';
import { Section } from '../shared/Section/Section';
import BookForm from './components/BookForm/BookForm';


 const AdminPortal: FC<{isAdmin: boolean, userId: number}> = ({isAdmin, userId}) => {
    const [borrows, setBorrows] = useState<Partial<ILoan>[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<Partial<ILoan>>>();
    const [isBookFormOpen, setIsBookFormOpen] = useState(false)
    const [refetchBooks, setRefetchBooks] = useState(false)
    const [addBookState, setAddBookState]  = useState<FormState>('pristine')
    const [shouldFetchLoans, setShouldFetchLoans] = useState(true);
    const  [shouldShowLoan, setShouldShowLoan]  = useState(false);
    const [loan, setLoan] = useState<Partial<ILoan>>();


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: Partial<Partial<ILoan>>) => {
        setShowModal(true);
        setSelectedBook(fullBook);
    }

    console.log(isLoading)
    const handleBookAddition = async (e: React.SyntheticEvent<Element, Event>, book: Partial<IBook>) => {
        e.preventDefault();
        
        try {
            await Api.addBook(book as IBook)
            .then(_ => {
                setAddBookState('submitted');
                setIsBookFormOpen(false);
                setRefetchBooks(() => true);
                setRefetchBooks(() => false)
            })
        } catch(e) {
            setError(e.message);
            setAddBookState('error');
            setRefetchBooks(() => false);
        } 
    }
    
    useEffect(() => {
        if(shouldFetchLoans) {
            Api.getBorrows()
            .then(({data}) => {
                setBorrows(data.loans)
                setIsLoading(false)
                setAddBookState('submitted')
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
                setAddBookState('error')
            }).finally(() => setShouldFetchLoans(false));
        }
          
    }, [shouldFetchLoans]);
    
    const borrowBook = (book: IBook) => {
        Api.createLoan({
            userId,
            bookId: book.id,
            days: 7,
        }).then(({data}) => {
            setShouldFetchLoans(!data.error);
            if(data.error) {
                setError(data.message)
            }
        })
        .catch(error => {
            setError(error.message)
        } );
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
    }

    return ( 
    <>
        <Row>
            <Section title="Add Book" dimensions={{xs: 12, sm: 2}}>
            <Button size="lg" variant="primary" onClick={e => setIsBookFormOpen(true)}> Add New Book</Button>
            </Section>
        </Row>
        <Row className="ml-0 mr-0 border">
            <BorrowedBooks
                isAdmin={isAdmin}
                borrows={borrows as ILoan[]}
                showLoan={showLoan}
            />
            <AllBooks
                adminView={isAdmin}
                showBookDetails={handleShowModal}
                refetch={refetchBooks}
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
                    isAdmin={isAdmin}
                    completeLoan={completeLoan}
                />
            </GeneralModal>

            <GeneralModal 
                handleClose={handleCloseModal} 
                title={selectedBook?.book?.title!}
                show={showModal}
                size="lg"
            >
                <div>{JSON.stringify(selectedBook)}</div>
            </GeneralModal>

            <GeneralModal
                handleClose={() => setIsBookFormOpen(false)} 
                title="Add New Book"
                show={isBookFormOpen}
                controls="closeOnly"
                size="lg"
            >
                <BookForm 
                    formState={addBookState}
                    error={error}
                    handleSubmit={(e, book) => handleBookAddition(e, book)}
                />
            </GeneralModal>
        </Row>
        </>
        )
}


export default AdminPortal;