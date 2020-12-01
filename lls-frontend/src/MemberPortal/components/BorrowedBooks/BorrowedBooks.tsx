import React, { FC } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { IUserBorrow } from '../../../../../models';
import withEllipsis from '../../../shared/HOCs/withElipsis';
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';
import './BorrowedBooks.css';




interface Props {
  borrows: IUserBorrow[]
}

const BorrowedBooks: FC<Props> = ({ borrows }) => {
    return (
    <Col
      as={'aside'}
      className="rounded h-50 p-0 bg-light border border-light Borrowed"
      sm={12}
      md={3}
    >
      <SectionTitle title={"Borrowed Books"} />

      <ListGroup>
        {
          borrows.map((borrow, i) => (<ListGroup.Item style={{cursor: 'pointer'}} key={i}>{
              withEllipsis(
                <span>{borrow.book.title}</span>
              )
            }</ListGroup.Item>))
        }
      </ListGroup>

    </Col>
    )
}


export default BorrowedBooks;