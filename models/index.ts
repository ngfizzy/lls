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
    approvedOn?: Date;
    expiresOn: Date;
}
