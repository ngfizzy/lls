const {Book} = require('../models');


module.exports =  {
    async addBook(book) {
        try {
          const book = await Book.create(book);

            return {
                book: book.toJSON(),
                message: 'Book Created Successfully',
                error: false,
            };
        } catch(error) {
            return {
                message: error.message,
                error: true,
            };
        }
    },
    async getAllBooks() {
        try {
            const books = await Book.findAll()
  
              return {
                  books: book.toJSON(),
                  message: 'Book fetched successfully',
                  error: false,
              };
          } catch(error) {
              return {
                  message: error.message,
                  error: true,
              };
          }
    }
}