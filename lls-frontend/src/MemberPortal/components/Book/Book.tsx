import React, { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IBook } from '../../../../../models';
import { bookDefaultImage } from '../../../constants';
import withEllipsis from '../../../shared/HOCs/withElipsis';
interface Props {
    book: IBook;
}

const Book: FC<Props> = ({book})  =>{
    return (
        <Card style={{ height: '30rem', overflow: 'hidden'}}>
            <Card.Img variant="top" src={book.cover ||  bookDefaultImage} height="300"/>
            <Card.Body>
                <div style={{ height: '78%'}}>

                    <Card.Title title={book.title}>
                    {withEllipsis(<span>{book.title}</span>, { fontSize: '1.1rem'})}

                    </Card.Title>
     
                    <Card.Text>
                        {book.summary.substr(0,79) + '...'}
                    </Card.Text>
                </div>
                <Button className="mr-1" variant="secondary">View Full</Button>
                <Button variant="primary">Borrow</Button>
            </Card.Body>
        </Card>
    )
}

export default Book;