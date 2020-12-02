export interface IBook  {
    cover: string;
    title: string;
    author: string;
    description: string;
    summary: string;
    ebook?: boolean;
    copies?: number;
}


export interface IUserBorrow  {
    book: IBook;
    requestedOn: Date;
    rejectedOn?: Date
    approvedOn?: Date;
    expiresOn: Date;
}


export type FormState =  'submitting'|
'submitted' |
'pristine' |
'error'