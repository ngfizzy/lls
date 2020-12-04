
import React, { FC } from 'react';

import { Button, Table } from 'react-bootstrap';
import { ILoan } from '../../../../models';


interface Props {
    loan: ILoan,
    notifyToReturn?: (loan: ILoan) =>  any;
    completeLoan?: (loan: ILoan) => any;
    isAdmin?: boolean;
}

const LoanDetails:FC<Props> = ({
    loan,
    notifyToReturn,
    completeLoan,
    isAdmin
}) => {
    
    const renderLoanData = (loanData: any) => {
        return Object.keys(loanData).map(key => {
            if(typeof (loanData as any)[key] === 'object') {
                return null
            }
    
            return (<tr>
                        <td>{key}</td>
                        <td>{(loanData as any)[key] || 'nil'}</td>
                    </tr>)
                });
    }

   return  <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>Property</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {loan? renderLoanData(loan) : null}
        </tbody>
        <tbody>
            <td colSpan={2}>Book Summary</td>
            {
                loan?.book ?
                    renderLoanData({
                        title: loan.book.title,
                        summary: loan.book.summary,
                        description: loan.book.description
                    }) : 
                    null
            }
            
        </tbody>
        <tfoot>
            <tr>
            <td>
                {
                    isAdmin ? 
                        <Button
                            onClick={() => notifyToReturn && notifyToReturn(loan)}
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
                    onClick={() => completeLoan && completeLoan(loan)}
                >
                    {
                        isAdmin?
                            'Withdraw Book From User'
                        :
                            'Return Book'
                    }
                </Button></td>
            </tr>
        </tfoot>
    </Table>
}

export default LoanDetails