import React from 'react'
import { Col } from 'react-bootstrap'
import SectionTitle from '../../../shared/SectionTitle/SectionTitle'

export default function AllBooks() {
    return (
        <Col 
        as={'main'}
        sm={12}
        md={9}
        className="ml-auto "
    >
             <SectionTitle title={"All Books"} />

    </Col>
    )
}
