import { EkartReducer } from './ekart.reducer';
import { bookInfo } from '@ecommerce/shared/services';
import { initialState } from './ekart.state';

describe('Ekart Reducer', () => {
  it('should check duplicate book and return cartItems length as 1', () => {
    const state = {
      ...initialState,
      cartItems: [{ id: '1' }],
    };
    const action = {
      type: '[Cart Component] AddToCartSuccess',
      payload: { id: '1' },
    };
    const { cartItems } = EkartReducer(state, action);
    expect(cartItems.length).toBe(1);
  });

  it(' should check book is inserted to cartItems ', () => {
    const state = {
      ...initialState,
      cartItems: [{ id: '1' }],
    };
    const action = {
      type: '[Cart Component] AddToCartSuccess',
      payload: { id: '2' },
    };
    const { cartItems } = EkartReducer(state, action);
    expect(cartItems.length).toBe(2);
  });

  it(' should cartBadge number should be updated', () => {
    const state = { ...initialState, cartItems: [{ id: '1' }] };
    const action = {
      type: 'updateCartBadge',
    };
    const { badgeNumber } = EkartReducer(state, action);
    expect(badgeNumber).toBe(1);
  });

  it('should delete cart Item and cartLength should be 0', () => {
    const state = { ...initialState, cartItems: [{ id: '1' }] };
    const action = {
      type: 'deleteCartItem',
      payload: '1',
    };
    const { cartItems } = EkartReducer(state, action);
    expect(cartItems.length).toBe(0);
  });

  it('Add to Collection should add one more item to Collection', () => {
    const state = { ...initialState };
    const action = {
      type: 'AddToCollection',
      payload: [bookInfo, { ...bookInfo, id: '123' }],
    };
    const { booksCollection } = EkartReducer(state, action);
    expect(booksCollection.length).toBe(2);
  });

  it('cartItems length should be zero if resetCartItems called', () => {
    const state = { ...initialState, cartItems: [{ id: '1' }, { id: '2' }] };
    const action = {
      type: 'resetCart',
    };
    const { cartItems } = EkartReducer(state, action);
    expect(cartItems.length).toBe(0);
  });

  it('searchString should be payload string', () => {
    const state = { ...initialState };
    const action = {
      type: 'searchBooks',
      searchString: 'angular',
    };
    const { searchString } = EkartReducer(state, action);
    expect(searchString).toBe('angular');
  });

  it('searchBooks length should be 2', () => {
    const state = { ...initialState };
    const action = {
      type: 'searchBooksSuccess',
      searchBooks: [
        { ...bookInfo, id: '12' },
        { ...bookInfo, id: '123' },
      ],
    };
    const { searchBooks } = EkartReducer(state, action);
    expect(searchBooks.length).toBe(2);
  });

  it('searchBooks length should be 2', () => {
    const state = { ...initialState };
    const action = {
      type: 'storeBookInfo',
      bookInfo: { id: 'angular' },
    };
    const { bookInfo } = EkartReducer(state, action);
    expect(bookInfo.id).toBe('angular');
  });
});
