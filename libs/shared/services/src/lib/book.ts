export interface Book {
  id: string;
  volumeInfo?: volumeInfo;
}

export interface volumeInfo {
  authors?: string[];
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language?: string;
  pageCount?: number;
  printedPageCount?: number;
  publisher?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export interface Books {
  items: Book[];
  kind: string;
}

export interface InitState {
  searchString: string;
  searchBooks: Book[];
  cartItems: Book[];
  badgeNumber: number;
  booksCollection: Book[];
  bookInfo: Book;
  errorMessage: string;
}

export const bookInfo: Book = {
  id: 'angular',
  volumeInfo: {
    authors: ['abcd'],
    imageLinks: {
      smallThumbnail: '',
      thumbnail: '',
    },
    language: 'en',
    pageCount: 2,
    printedPageCount: 2,
    publisher: '',
    title: 'Angualr book',
    subtitle: '',
    description: 'about angular',
  },
};
