import { bookInfo } from '@ecommerce/shared/services';
import * as Actions from './ekart.action';

describe('Store > Data > DataActions', () => {
  it('should create an AddToCartSuccess action', () => {
    const action = Actions.AddToCartSuccess({ payload: bookInfo });
    expect(action).toEqual({
      type: '[Cart Component] AddToCartSuccess',
      payload: bookInfo,
    });
  });

  it('should create resetCart Action', () => {
    const action = Actions.resetCart();
    expect({ ...action }).toEqual({
      type: 'resetCart',
    });
  });

  it('should create updateCartBadge Action', () => {
    const action = Actions.updateCartBadge();
    expect({ ...action }).toEqual({
      type: 'updateCartBadge',
    });
  });

  it('should create deleteCartItem Action', () => {
    const action = Actions.deleteCartItem({ payload: 'angular' });
    expect({ ...action }).toEqual({
      type: 'deleteCartItem',
      payload: 'angular',
    });
  });
  it('should create AddToCollection Action', () => {
    const action = Actions.AddToCollection({
      payload: [bookInfo, { id: '123' }],
    });
    expect({ ...action }).toEqual({
      type: 'AddToCollection',
      payload: [bookInfo, { id: '123' }],
    });
  });

  it('should create searchBooksSuccess Action', () => {
    const action = Actions.searchBooksSuccess({
      searchBooks: [bookInfo, { id: '123' }],
    });
    expect({ ...action }).toEqual({
      type: 'searchBooksSuccess',
      searchBooks: [bookInfo, { id: '123' }],
    });
  });

  it('should create loadSearchBooks Action', () => {
    const action = Actions.loadSearchBooks({
      searchString: '123',
    });
    expect({ ...action }).toEqual({
      type: 'searchBooks',
      searchString: '123',
    });
  });

  it('should create getBookInfo Action', () => {
    const action = Actions.getBookInfo({
      bookId: '123',
    });
    expect({ ...action }).toEqual({
      type: 'getBookInfo',
      bookId: '123',
    });
  });

  it('should create storeBookInfo Action', () => {
    const action = Actions.storeBookInfo({
      bookInfo: { id: '123' },
    });
    expect({ ...action }).toEqual({
      type: 'storeBookInfo',
      bookInfo: { id: '123' },
    });
  });
});
