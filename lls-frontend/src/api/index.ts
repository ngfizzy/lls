import axios from 'axios';
import { IBook } from '../../../models';

class MemberApiFacade {

    private apiBaseUrl = 'http://192.168.8.103:8080/api'

    getAllBooks() {
        return axios({
            url: `${this.apiBaseUrl}/books`,
            method: 'get'
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
}

export default new MemberApiFacade();