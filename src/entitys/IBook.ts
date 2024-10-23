interface IBook {
    id: number;
    title?: string;
    year: number;
    authorsIds: number[];
  }

export default IBook;