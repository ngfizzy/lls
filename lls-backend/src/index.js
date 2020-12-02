const express  = require('express');
const  cors = require('cors');

const { Books }  = require('./data/Books');
const { UserBorrows } = require('./data/UserBorrows');

require('dotenv').config();


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DATABASE AUTHENTICATED SUCCESSFULLY 🚀')
    } catch(e) {
        console.error('UNABLE TO CONNECT TO THE DATABASE 😥', e)
    }
})()

const app = express();
const PORT = process.env.PORT || 8080;
const PRIVATE_IP = process.env.PRIVATE_IP;

app.use(cors());
app.use(express.json())

app.get('/api/books', (_, res) => {
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

app.post('/api/books', (req, res) => {
    Books.unshift(req.body)
    return res.json({
        message: 'Book Added Successfully',
        book: req.body,
    })
});


app.get('*', (_, res) => {
    return res.json({ message: 'hello world'});
});

app.listen(PORT, () => (console.log(`App running on port: ${PORT} 🚀`)))

if(PRIVATE_IP) {

    app.listen(
        PORT,
        PRIVATE_IP,
        () => (console.log(`App running on port: ${PORT} 🚀`))
    )
}
