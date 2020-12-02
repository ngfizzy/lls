export interface IBook {
    id: number;
    cover: string;
    title: string;
    authorId: number
    description: string;
    copies: number
    ebook: boolean;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
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