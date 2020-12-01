
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { IUserBorrow } from '../../../models'
import Api from './api'

import AllBooks from './components/AllBooks/AllBooks'
import BorrowedBooks from './components/BorrowedBooks/BorrowedBooks'

import './MemberPortal.css'
export default function MemberPortal() {

    const [borrows, setBorrows] = useState<IUserBorrow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    console.log(isLoading, error);
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
            <BorrowedBooks borrows={borrows} />

            <AllBooks />
        </Row>
    )
}
