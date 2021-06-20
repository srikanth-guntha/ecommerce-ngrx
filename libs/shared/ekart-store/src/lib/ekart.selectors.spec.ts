import { bookInfo } from '@ecommerce/shared/services';
import {
  getBadgeNumber,
  getCartItems,
  getCollectionBooks,
  getSearchBooksSuccess,
  getSearchString,
  showBookInfo,
} from './ekart.selector';
import { initialState } from './ekart.state';

describe('Ekart Selector', () => {
  it('should return cartItems from store', () => {
    const state = {
      ...initialState,
      cartItems: [bookInfo, { ...bookInfo, id: '123' }],
    };
    const bookInfo1 = { ...bookInfo, id: '123' };
    expect(getCartItems.projector(state)).toEqual([bookInfo, bookInfo1]);
  });

  it('should return badgeNumber from store', () => {
    const state = {
      ...initialState,
      badgeNumber: 10,
    };
    expect(getBadgeNumber.projector(state)).toBe(10);
  });

  it('should return booksCollection from store', () => {
    const state = {
      ...initialState,
      booksCollection: [bookInfo, { ...bookInfo, id: 'ang' }],
    };
    expect(getCollectionBooks.projector(state)).toEqual([
      bookInfo,
      { ...bookInfo, id: 'ang' },
    ]);
  });

  it('should return searchString from store', () => {
    const state = {
      ...initialState,
      searchString: 'ang',
    };
    expect(getSearchString.projector(state)).toEqual('ang');
  });

  it('should return searchBooks from store', () => {
    const state = {
      ...initialState,
      searchBooks: [bookInfo],
    };
    expect(getSearchBooksSuccess.projector(state)).toEqual([bookInfo]);
  });

  it('should return bookInfo from store', () => {
    const state = {
      ...initialState,
      bookInfo: { id: '1' },
    };
    expect(showBookInfo.projector(state)).toEqual({ id: '1' });
  });
});
