import { InitState } from '@ecommerce/shared/services';

export const initialState: InitState = {
  searchString: '',
  searchBooks: [],
  cartItems: [],
  badgeNumber: 0,
  booksCollection: [],
  bookInfo: { id: 'angular' },
  searchErrorMessage: '',
  bookDetailsErrorMessage: '',
};
