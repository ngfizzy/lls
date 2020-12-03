const {Book, Author} = require('../models');
const author = require('../models/author');


module.exports =  {
    async addBook(book) {
        const {authorName, ...newBook} = book;

        try {
            let author = await Author.findOne({where: { name: authorName}});

            if(!author) {
                author =  await Author.create({name: authorName});
            }

            newBook.authorId = author.id;

            const createdBook = await Book.create(newBook);

            return {
                book: createdBook.toJSON(),
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
                  books,
                  message: 'Book fetched successfully',
                  error: false,
              };
          } catch(error) {
              return {
                  message: error.message,
                  error: true,
              };
          }
    },
}