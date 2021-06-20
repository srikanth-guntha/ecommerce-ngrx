import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddToCartSuccess,
  AddToCollection,
  deleteCartItem,
  getBadgeNumber,
  getBookInfo,
  getCartItems,
  getCollectionBooks,
  getSearchBooksSuccess,
  getSearchString,
  loadSearchBooks,
  resetCart,
  showBookInfo,
  updateCartBadge,
} from '@ecommerce/shared/ekart-store';
import {
  Book,
  InitState,
  EkartService,
  bookInfo,
} from '@ecommerce/shared/services';

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
