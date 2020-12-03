import axios from 'axios';
import { IBook, ILoan, IUser } from '../../../models';

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
            url:  `${this.apiBaseUrl}/loans`,
            method: 'get',
            headers: { authorization: localStorage.getItem('token')}
        })
    }

    createLoan(loan: { userId: number; bookId: number; days: number; }) {
        return axios({
            url: `${this.apiBaseUrl}/loans`,
            method: 'post',
            data: loan,
            headers: { authorization: localStorage.getItem('token')},
        })
    }

    addBook(book: IBook) {
        return axios({
            url: `${this.apiBaseUrl}/books`,
            method: 'POST',
            data: book,
            headers: { authorization: localStorage.getItem('token')}
        });
    }

    completeLoan(loan: ILoan) {
        return axios({
            url: `${this.apiBaseUrl}/loans/${loan.id}`,
            method: 'DELETE',
            headers: { authorization: localStorage.getItem('token')}
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