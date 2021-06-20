import { TestBed } from '@angular/core/testing';
import { Actions, Effect } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { searchEffects } from './ekart.effects';
import { bookInfo, EkartService } from '@ecommerce/shared/services';
import { RouterTestingModule } from '@angular/router/testing';
import { of, ReplaySubject } from 'rxjs';

const mockEkartService = {
  getBooksBySearch() {
    return of([{ id: 'ang' }]);
  },
  getBookInfo() {
    return of({ id: 'hyd' });
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
