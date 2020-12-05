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
    authors: IAuthor[]
    authorName?: string
}

export interface IAuthor {
    id: number;
    name: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string
    roles: 'admin' | 'member' | null;
}

export interface ILoan  {
    id?: number;
    book: IBook;
    user: IUser;
    bookId: number;
    userId: number;
    requestedOn: Date;
    rejectedOn?: Date
    approvedOn?: Date;
    expiresOn: Date;
}

export interface INotification {
    title: string;
    id: number;
    userId: number;
    details: string;
}

export type FormState =  'submitting'|
'submitted' |
'pristine' |
'error'