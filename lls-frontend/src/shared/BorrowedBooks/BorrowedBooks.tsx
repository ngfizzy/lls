import React, { FC } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { IUserBorrow } from '../../../../models';
import withEllipsis from '../HOCs/withElipsis';
import {SectionTitle} from '..';
import './BorrowedBooks.css';


interface Props {
  borrows: IUserBorrow[];
  showLoan: (arg: Partial<IUserBorrow>) => any;
}

export const BorrowedBooks: FC<Props> = ({ borrows, showLoan }) => {
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
          borrows.map((borrow, i) => (<ListGroup.Item
              style={{cursor: 'pointer'}}
              key={i}
              onClick={(e) =>{
                showLoan(borrows[i]);
              }}
              >{
              withEllipsis(
                <span>{borrow.book.title}</span>
              )
            }</ListGroup.Item>))
        }
      </ListGroup>

    </Col>
    )
}
