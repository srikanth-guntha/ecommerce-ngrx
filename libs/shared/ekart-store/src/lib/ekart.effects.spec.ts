import { TestBed } from '@angular/core/testing';
import { Actions, Effect } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { compose, Store } from '@ngrx/store';
import { searchEffects } from './ekart.effects';
import { bookInfo, EkartService } from '@ecommerce/shared/services';
import { RouterTestingModule } from '@angular/router/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

const mockEkartService = {
  getBooksBySearch() {
    return of([{ id: 'ang' }]);
  },
  getBookInfo() {
    return of({ id: 'hyd' });
  },
};

const mockEkartService1 = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBooksBySearch() {
    return throwError(
      new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
      })
    );
  },
  getBookInfo() {
    return throwError(
      new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
      })
    );
  },
};
describe('searchEffects', () => {
  let effects: searchEffects;
  let actions$ = new ReplaySubject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        Store,
        { provide: EkartService, useValue: mockEkartService },
        searchEffects,
        provideMockActions(() => actions$),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    effects = TestBed.inject(searchEffects);
  });

  it('search books api call', (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: 'searchBooks',
      searchString: 'ang',
    });
    effects.searchBooks$.subscribe((data) => {
      expect(data.searchBooks[0].id).toBe('ang');
      done();
    });
  });
  it('search books api call and searchBook length should be zero', (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: 'searchBooks',
      searchString: '',
    });
    effects.searchBooks$.subscribe((data) => {
      expect(data.searchBooks.length).toBe(0);
      done();
    });
  });

  it('get book info api call', (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: 'getBookInfo',
      bookId: 'angular',
    });
    effects.getBookInfo$.subscribe((data) => {
      expect(data.bookInfo.id).toEqual('hyd');
      done();
    });
  });

  it('get book info api call should return empty string', (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: 'getBookInfo',
      bookId: '',
    });
    effects.getBookInfo$.subscribe((data) => {
      expect(data.bookInfo.id).toEqual('');
      done();
    });
  });
});

describe('searchEffects failure', () => {
  let effects: searchEffects;
  let actions$ = new ReplaySubject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        Store,
        { provide: EkartService, useValue: mockEkartService1 },
        searchEffects,
        provideMockActions(() => actions$),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    effects = TestBed.inject(searchEffects);
  });

  it('get book info api call should return errorMessage', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: 'getBookInfo',
      bookId: 'angular',
    });
    effects.getBookInfo$.subscribe((data) => {
      expect(data.bookInfo.id).toBe('fail');
      done();
    });
  });

  it('search books api call failure', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: 'searchBooks',
      searchString: 'ab',
    });
    effects.searchBooks$.subscribe((data) => {
      expect(data.searchBooks.length).toBe(0);
      done();
    });
  });
});
