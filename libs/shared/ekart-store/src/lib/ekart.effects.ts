import { Injectable } from '@angular/core';
import { Book, EkartService } from '@ecommerce/shared/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  getBookInfo,
  loadBookFailureInfo,
  loadSearchBooks,
  searchBooksSuccess,
  storeBookInfo,
} from './ekart.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
                let books = [];
                books = data.map((value) => {
                  return {
                    id: value.id,
                    volumeInfo: {
                      imageLinks: value.volumeInfo?.imageLinks,
                      title: value.volumeInfo?.title,
                      subtitle: value.volumeInfo?.subtitle,
                      description: value.volumeInfo?.description,
                      authors: value.volumeInfo?.authors,
                    },
                  };
                });
                return searchBooksSuccess({ searchBooks: books });
              }),
              catchError((err: HttpErrorResponse) => {
                console.log('caught mapping error and rethrowing', err);
                return of(
                  loadBookFailureInfo({
                    errorMsg: err.message,
                    searchBooks: [],
                  })
                );
                //  return throwError(err);
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
              map((data: Book) => {
                const obj: Book = { id: '' };
                obj.id = data.id;
                obj.volumeInfo = {
                  imageLinks: data.volumeInfo?.imageLinks,
                  title: data.volumeInfo?.title,
                  publisher: data.volumeInfo?.publisher,
                  printedPageCount: data.volumeInfo?.printedPageCount,
                  language: data.volumeInfo?.language,
                  description: data.volumeInfo?.description,
                  authors: data.volumeInfo?.authors,
                };
                return storeBookInfo({ bookInfo: obj });
              })
            )
          : of(storeBookInfo({ bookInfo: { id: '' } }));
      })
    );
  });
}
