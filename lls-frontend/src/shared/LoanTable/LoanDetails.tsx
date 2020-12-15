
import React, { FC, useCallback } from 'react';

import { Button, Table } from 'react-bootstrap';
import { ILoan } from '../../../../models';
import LoanTableBody from './LoanTableBody';
import LoanTableRows from './LoanTableRows';


interface Props {
    loan: ILoan,
    notifyToReturn?: (loan: ILoan) =>  any;
    completeLoan?: (loan: ILoan) => any;
    isAdmin?: boolean;
    hideControls?: boolean;
}

const LoanDetails:FC<Props> = ({
    loan,
    notifyToReturn,
    completeLoan,
    isAdmin,
    hideControls
}) => {
   const onCompleteLoan = useCallback(() => {
        completeLoan && completeLoan(loan);
    }, [completeLoan, loan])

    const onNotifyToReturn = useCallback(() => {
        notifyToReturn && notifyToReturn(loan);
    }, [notifyToReturn, loan])

    const borrower = loan?.user? {
        id: loan.user.id,
        'First Name': loan.user.firstName,
        'Last Name': loan.user.lastName,
        'Email': loan.user.email
    } : null;
   
    const book = loan?.book ? {
        title: loan.book.title,
        summary: loan.book.summary,
        description: loan.book.description
    } : null;
   return  <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <LoanTableBody> 
                    {loan? <LoanTableRows loanData={loan} /> : <></>}
                </LoanTableBody>
                <LoanTableBody tableSectionTitle="Borrower's Information">
                    { borrower ? <LoanTableRows loanData={borrower}/> : <></>}
                </LoanTableBody>
                <LoanTableBody tableSectionTitle="Book Summary" >
                    {book ? <LoanTableRows loanData={book} /> : <></>}
                </LoanTableBody>

                <tfoot>
                { !hideControls? <tr>
                    <td>
                        {
                            isAdmin ? 
                                <Button onClick={onNotifyToReturn}
                                    variant="secondary"
                                >
                                    Notify To Return
                                </Button>
                            :
                            null
                        }
                    </td>
                    <td>
                        <Button 
                            variant="primary"
                            onClick={onCompleteLoan}
                        >
                            {
                                isAdmin?
                                    'Withdraw Book From User'
                                :
                                    'Return Book'
                            }
                        </Button></td>
                    </tr>: null}
                </tfoot>
    </Table>
}

export default LoanDetails;