import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class EkartService {
  constructor(private httpClient: HttpClient) {}

  getBookInfo(id: string): Observable<Book> {
    return this.httpClient.get<Book>(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
  }

  getBooksBySearch(searchString: string) {
    if (searchString == '') {
      return of([]);
    } else {
      return this.httpClient
        .get<{ items: Book[] }>(
          `https://www.googleapis.com/books/v1/volumes?q=${searchString}`
        )
        .pipe(map((booksJson) => booksJson.items as Array<Book>));
    }
  }
}
