import { InitState } from '@ecommerce/shared/services';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const eKartAppState = createFeatureSelector<InitState>('shoppingList');

export const getCartItems = createSelector(eKartAppState, (state) => {
  return state.cartItems;
});

export const getBadgeNumber = createSelector(eKartAppState, (state) => {
  return state.badgeNumber;
});

export const getCollectionBooks = createSelector(eKartAppState, (state) => {
  return state.booksCollection;
});

export const getSearchString = createSelector(eKartAppState, (state) => {
  return state.searchString;
});

export const getSearchBooksSuccess = createSelector(eKartAppState, (state) => {
  return state.searchBooks;
});
export const showBookInfo = createSelector(eKartAppState, (state) => {
  return state.bookInfo;
});
