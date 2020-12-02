import React, { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { IBook } from '../../../../models';
import { bookDefaultImage } from '../../constants';
import withEllipsis from '../HOCs/withElipsis';

interface Props {
    book: IBook;
    showBook: (arg: { book: IBook}) => any;
    deleteBook?: (arg: IBook) => any;
    editBook?: (arg: IBook) => any;
    isAdmin?: boolean;
}

export const Book: FC<Props> = ({book, showBook, deleteBook, isAdmin})  =>{
    return (
        <Card 
            style={{ height: '30rem', overflow: 'hidden'}}
            onClick={() => showBook({book})}
        >
          { isAdmin? <div className="position-absolute p-1 AdminControls">
                <FontAwesomeIcon icon={faTrash} className="mr-1 text-danger Pointer"/>
                <FontAwesomeIcon icon={faEdit} className="Pointer" />
            </div>: null}
                        

            <Card.Img variant="top" src={book.cover ||  bookDefaultImage} height="300"/>
            <Card.Body>

                <div style={{ height: '78%'}}>
                    <Card.Title title={book?.title}>
                        {withEllipsis(<span>{book?.title}</span>, { fontSize: '1.1rem'})}
                    </Card.Title>
     
                    <Card.Text>
                        {(book.summary || '').substr(0,79) + '...'}
                    </Card.Text>
                </div>
                <Button className="mr-1" variant="secondary" onClick={() => showBook({book})}>View Full</Button>
                <Button variant="primary">Borrow</Button>
            </Card.Body>
        </Card>
    )
}

