import React from 'react'
import { Col } from 'react-bootstrap'
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';

import './BorrowedBooks.css';
export default function BorrowedBooks() {
    return (
    <Col
        as={'aside'}
        sm={12}
        md={3}
        className="rounded h-50 p-0 bg-light border border-light Borrowed"
    >
      <SectionTitle title={"Borrowed Books"} />

    </Col>
    )
}
