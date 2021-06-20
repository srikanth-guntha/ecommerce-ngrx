import { Injectable } from '@angular/core';
import { Book, EkartService } from '@ecommerce/shared/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getBookInfo,
  loadSearchBooks,
  searchBooksSuccess,
  storeBookInfo,
} from './ekart.action';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class searchEffects {
  constructor(private actions$: Actions, private ekartService: EkartService) {}

  searchBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSearchBooks),
      switchMap((action) => {
        return action.searchString
          ? this.ekartService.getBooksBySearch(action.searchString).pipe(
              map((data: Book[]) => {
                return searchBooksSuccess({ searchBooks: data });
              })
            )
          : of(searchBooksSuccess({ searchBooks: [] }));
      })
    );
  });

  getBookInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBookInfo),
      switchMap((action) => {
        return action.bookId
          ? this.ekartService.getBookInfo(action.bookId).pipe(
              map((data: any) => {
                return storeBookInfo({ bookInfo: data });
              })
            )
          : of(storeBookInfo({ bookInfo: { id: '' } }));
      })
    );
  });
}
