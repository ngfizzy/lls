const { Loan, Book } = require('../models');

module.exports = {
    async getAllLoans() {
        try {
            const loans =  await Loan.findAll();

            if(loans) {
                const bookLoans = await this.getBookLoans(loans)
                 return {
                     loans: bookLoans,
                     message: 'loans fetched successfully',
                     error: false
                 };
             } else {
                 return {
                     message: 'Could not fetch book loans',
                     error: true,
                 };
             }
        } catch(e) {
           return  {
                message: 'Something went wrong',
                error: true
            }
        } 
    },
    getBookLoans(loans) {
        return Promise.all(
            loans.map(async (loan) => {
             const book =  await Book.findOne({where: { id: loan.bookId}});
             const newLoan = loan.toJSON();
             newLoan.book = book;

             return newLoan;
         }));
    },
    async getUserLoans(user) {
        try {
            const loans =  await Loan.findAll({ where: {userId: user.id }});

            if(loans) {
               const bookLoans = await this.getBookLoans(loans, user)
                return {
                    loans: bookLoans,
                    message: 'loans fetched successfully',
                    error: false
                };
            } else {
                return {
                    message: 'Could not fetch book loans',
                    error: true,
                }
            }
        
        } catch(e) {

           return  {
                message: 'Something went wrong',
                error: true,
            };
        } 
    },

    async createLoan(loan) {
        try {
            const createdLoan = await Loan.create(loan);

            return {
                loan: createdLoan,
                message: 'loan created successfully',
                error: false
            };
        } catch(e) {

            return  {
                message: 'Something went wrong',
                error: true,
            };
        }
    }
};
