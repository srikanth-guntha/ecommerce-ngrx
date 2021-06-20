import { createAction, props } from '@ngrx/store';
import { Book } from '@ecommerce/shared/services';

export const AddToCartSuccess = createAction(
  '[Cart Component] AddToCartSuccess',
  props<{ payload: Book }>()
);

export const resetCart = createAction('resetCart');

export const updateCartBadge = createAction('updateCartBadge');

export const deleteCartItem = createAction(
  'deleteCartItem',
  props<{ payload: string }>()
);

export const AddToCollection = createAction(
  'AddToCollection',
  props<{ payload: Book[] }>()
);

export const loadSearchBooks = createAction(
  'searchBooks',
  props<{ searchString: string }>()
);

export const searchBooksSuccess = createAction(
  'searchBooksSuccess',
  props<{ searchBooks: Book[] }>()
);

export const getBookInfo = createAction(
  'getBookInfo',
  props<{ bookId: string }>()
);
export const storeBookInfo = createAction(
  'storeBookInfo',
  props<{ bookInfo: Book }>()
);
