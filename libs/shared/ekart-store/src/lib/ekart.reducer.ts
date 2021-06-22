import { Book } from '@ecommerce/shared/services';
import { Action, createReducer, on } from '@ngrx/store';
import * as ekartActions from './ekart.action';
import { initialState } from './ekart.state';

const _ekartReducer = createReducer(
  initialState,
  on(ekartActions.AddToCartSuccess, (state, action) => {
    let duplicateBook = false;
    const cartItems = Object.assign([], state.cartItems);
    cartItems.forEach((eachBook: Book) => {
      if (eachBook.id == action.payload.id) {
        duplicateBook = true;
      }
    });
    if (!duplicateBook) {
      cartItems.push(action.payload);
    }
    return {
      ...state,
      cartItems: [...cartItems],
    };
  }),
  on(ekartActions.updateCartBadge, (state) => {
    return {
      ...state,
      badgeNumber: state.cartItems.length,
    };
  }),
  on(ekartActions.deleteCartItem, (state, action) => {
    const cartItems = state.cartItems.filter((cartItem) => {
      return action.payload !== cartItem.id;
    });
    return {
      ...state,
      cartItems: [...cartItems],
    };
  }),
  on(ekartActions.AddToCollection, (state, action) => {
    return {
      ...state,
      booksCollection: [...state.booksCollection, ...action.payload],
    };
  }),
  on(ekartActions.resetCart, (state) => {
    return {
      ...state,
      cartItems: [],
    };
  }),
  on(ekartActions.loadSearchBooks, (state, action) => {
    return {
      ...state,
      searchString: action.searchString,
    };
  }),
  on(ekartActions.searchBooksSuccess, (state, action) => {
    return {
      ...state,
      searchBooks: [...action.searchBooks],
    };
  }),
  on(ekartActions.storeBookInfo, (state, action) => {
    return {
      ...state,
      bookInfo: action.bookInfo,
    };
  }),
  on(ekartActions.searchBooksFailure, (state, action) => {
    return {
      ...state,
      searchErrorMessage: action.errorMsg,
      searchBooks: action.searchBooks,
    };
  }),
  on(ekartActions.loadBookFailure, (state, action) => {
    return {
      ...state,
      bookDetailsErrorMessage: action.errorMsg,
      bookInfo: action.bookInfo,
    };
  })
);

export function EkartReducer(state = initialState, action: Action) {
  return _ekartReducer(state, action);
}
