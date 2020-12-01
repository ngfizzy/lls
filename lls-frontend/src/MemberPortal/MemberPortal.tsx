
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import AllBooks from './components/AllBooks/AllBooks'
import BorrowedBooks from './components/BorrowedBooks/BorrowedBooks'

import './MemberPortal.css'
export default function MemberPortal() {
    return (
        <Row className="ml-0 mr-0 border MemberPortal">
            <BorrowedBooks />

           <AllBooks />


        </Row>
    )
}
