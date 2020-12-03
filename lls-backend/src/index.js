const express  = require('express');
const  cors = require('cors');

const { Books }  = require('./data/Books');
const { UserBorrows } = require('./data/UserBorrows');
const routes = require('./routes/');
const useAuth = require('./custom-middleware/auth-middleware')

require('dotenv').config();


const sequelize = require('./sequelize/sequelize');


(async () => {
    try {
        await sequelize.authenticate();
        console.log('DATABASE AUTHENTICATED SUCCESSFULLY 🚀');
    } catch(e) {
        console.error('UNABLE TO CONNECT TO THE DATABASE 😥', e);
    }
})()

const app = express();
const PORT = process.env.PORT || 8080;
const PRIVATE_IP = process.env.PRIVATE_IP;

app.use(cors());
app.use(express.json());

app.use('/api/auth', routes.userRoutes);
app.use('/api/books', useAuth, routes.bookRoutes);

app.get('/api/users/:id/borrows', (_, res) => {
    return res.json({
        message: 'User\'s Borrowed Books Fetched Successfully',
        borrows: UserBorrows
    });
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
