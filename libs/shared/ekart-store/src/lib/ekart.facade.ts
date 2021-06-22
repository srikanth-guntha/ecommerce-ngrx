import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddToCartSuccess,
  AddToCollection,
  deleteCartItem,
  getBookInfo,
  loadSearchBooks,
  resetCart,
  updateCartBadge,
  loadBookFailureInfo,
} from './ekart.action';
import { Book, InitState, EkartService } from '@ecommerce/shared/services';
import {
  getBookFailureInfo,
  getCartItems,
  getBadgeNumber,
  getCollectionBooks,
  getSearchBooksSuccess,
  showBookInfo,
  getSearchString,
} from './ekart.selector';

@Injectable({
  providedIn: 'root',
})
export class EkartFacade {
  getCartItems$ = this.store.select(getCartItems);
  getBadgeNumber$ = this.store.select(getBadgeNumber);
  getCollectionBooks$ = this.store.select(getCollectionBooks);
  getSearchString$ = this.store.select(getSearchString);
  getSearchBooksSuccess$ = this.store.select(getSearchBooksSuccess);
  showBookInfo$ = this.store.select(showBookInfo);
  getBookFailureInfo$ = this.store.select(getBookFailureInfo);

  constructor(
    private store: Store<InitState>,
    private ekartService: EkartService
  ) {}

  resetCartItems() {
    this.store.dispatch(resetCart());
  }
  updateCartBadge() {
    this.store.dispatch(updateCartBadge());
  }
  addToCollection(ekartItems: Book[]) {
    this.store.dispatch(AddToCollection({ payload: ekartItems }));
  }
  loadSearchBooks(searchString: string) {
    this.store.dispatch(loadSearchBooks({ searchString }));
  }
  addToCart(book: Book) {
    this.store.dispatch(AddToCartSuccess({ payload: book }));
  }
  deleteCartItem(book: Book) {
    this.store.dispatch(deleteCartItem({ payload: book.id }));
  }

  getBookInfo(bookId: string) {
    this.store.dispatch(getBookInfo({ bookId: bookId }));
  }
}
