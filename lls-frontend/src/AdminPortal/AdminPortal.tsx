import React, { FC, useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import {FormState, IBook, IUserBorrow } from '../../../models';
import Api from '../api';
import { AllBooks, BorrowedBooks, GeneralModal } from '../shared';
import { Section } from '../shared/Section/Section';
import BookForm from './components/BookForm/BookForm';


 const AdminPortal: FC<{isAdmin: boolean, userId: number}> = ({isAdmin, userId}) => {
    const [borrows, setBorrows] = useState<IUserBorrow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<IUserBorrow>>();
    const [isBookFormOpen, setIsBookFormOpen] = useState(false)
    const [refetchBooks, setRefetchBooks] = useState(false)
    const [addBookState, setAddBookState]  = useState<FormState>('pristine')

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: Partial<IUserBorrow>) => {
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
        if(userId) {
            Api.getBorrows(userId)
            .then(({data}) => {
                setBorrows(data.borrows)
                setIsLoading(false)
                setAddBookState('submitted')
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
                setAddBookState('error')
            });
        }
    }, [userId]);
    
    
    return ( 
        <>
        <Row>
            <Section title="Add Book" dimensions={{xs: 12, sm: 2}}>
            <Button size="lg" variant="primary" onClick={e => setIsBookFormOpen(true)}> Add New Book</Button>
            </Section>
        </Row>
        <Row className="ml-0 mr-0 border">
       
            <BorrowedBooks
                borrows={borrows}
                showBookDetails={handleShowModal}
            />
            <AllBooks
                adminView={isAdmin}
                showBookDetails={handleShowModal}
                refetch={refetchBooks}
            />

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