import axios from 'axios';
import { IBook, IUser } from '../../../models';

class ApiFacade {

    private apiBaseUrl = 'http://localhost:8080/api'

    getAllBooks() {
        return axios({
            url: `${this.apiBaseUrl}/books`,
            method: 'get',
            headers: { authorization: localStorage.getItem('token')}
        });
    }

    getBorrows() {
        return axios({
            url:  `${this.apiBaseUrl}/users/1/borrows`,
            method: 'get'
        })
    }

    addBook(book: IBook) {
        return axios({
            url: `${this.apiBaseUrl}/books`,
            method: 'POST',
            data: book
        });
    }

    signup(user: Partial<IUser>) {
        return axios({
            url: `${this.apiBaseUrl}/auth/signup`,
            method: `POST`,
            data:  user,
        })
    }

    login(user: Partial<IUser>) {
        return axios({
            url: `${this.apiBaseUrl}/auth/login`,
            method: `POST`,
            data:  user,
        })
    }
}

export default new ApiFacade();