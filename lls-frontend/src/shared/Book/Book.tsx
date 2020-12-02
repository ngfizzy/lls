import React, { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IBook } from '../../../../models';
import { bookDefaultImage } from '../../constants';
import withEllipsis from '../HOCs/withElipsis';
interface Props {
    book: IBook;
    showBook: (arg: { book: IBook}) => any
}

export const Book: FC<Props> = ({book, showBook})  =>{
    return (
        <Card 
            style={{ height: '30rem', overflow: 'hidden'}}
            onClick={() => showBook({book})}
        >
            <Card.Img variant="top" src={book.cover ||  bookDefaultImage} height="300"/>
            <Card.Body>
                <div style={{ height: '78%'}}>

                    <Card.Title title={book?.title}>
                        {withEllipsis(<span>{book?.title}</span>, { fontSize: '1.1rem'})}
                    </Card.Title>
     
                    <Card.Text>
                        {(book.summary|| '').substr(0,79) + '...'}
                    </Card.Text>
                </div>
                <Button className="mr-1" variant="secondary" onClick={() => showBook({book})}>View Full</Button>
                <Button variant="primary">Borrow</Button>
            </Card.Body>
        </Card>
    )
}

