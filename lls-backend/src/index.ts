import express, { Response, Request } from 'express';
import cors from 'cors';

import { Books} from './data/Books';
import { UserBorrows } from './data/UserBorrows';

const app = express();
const PORT = process.env.PORT || 8080;
const PRIVATE_IP = process.env.PRIVATE_IP;

app.use(cors());
app.use(express.json())

app.get('/api/books', (_, res:  Response) => {
    res.json({
        message: 'Books Fetched Successfully',
        books: Books,
        error: false
    })
});

app.get('/api/users/:id/borrows', (_, res) => {
    return res.json({
        message: 'User\'s Borrowed Books Fetched Successfully',
        borrows: UserBorrows
    });
});

app.post('/api/books', (req: Request, res: Response) => {
    Books.unshift(req.body)
    return res.json({
        message: 'Book Added Successfully',
        book: req.body,
    })
});

app.get('*', (_, res: Response) => {
    return res.json({ message: 'hello world'});
});

app.listen(PORT, () => (console.log(`App running on port: ${PORT} 🚀`)))

if(PRIVATE_IP) {

    app.listen(
        PORT as number,
        PRIVATE_IP,
        () => (console.log(`App running on port: ${PORT} 🚀`))
    )
}
