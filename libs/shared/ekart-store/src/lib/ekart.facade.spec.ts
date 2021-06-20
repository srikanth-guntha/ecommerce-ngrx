import { TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EkartFacade } from './ekart.facade';
import { initialState } from './ekart.state';
import { bookInfo, InitState } from '@ecommerce/shared/services';
import { of } from 'rxjs';
import {
  AddToCartSuccess,
  AddToCollection,
  deleteCartItem,
  getBookInfo,
  loadSearchBooks,
  resetCart,
  storeBookInfo,
  updateCartBadge,
} from './ekart.action';

const mockStore = {
  select(key: MemoizedSelector<InitState, any, any>) {
    initialState.booksCollection = [{ id: 'ang' }];
    initialState.searchBooks = [{ id: 'node' }, { id: 'jest' }];
    initialState.cartItems = [{ id: 'jasmine' }, { id: 'angular' }];
    initialState.badgeNumber = 2;
    return of(key.projector(initialState));
  },
  dispatch: jasmine.createSpy('dispatch'),
};
describe('EkartFacade', () => {
  let facade: EkartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EkartFacade, { provide: Store, useValue: mockStore }],
    });
    // TestBed.inject(Store);
    facade = TestBed.inject(EkartFacade);
  });
  it('should call getCartItems$ of EkartFacade ', (done) => {
    facade.getCartItems$.subscribe((data) => {
      expect(data.length).toBe(2);
      done();
    });
  });

  it('should call getBadgeNumber$ of EkartFacade ', (done) => {
    facade.getBadgeNumber$.subscribe((data) => {
      expect(data).toBe(2);
      done();
    });
  });

  it('should call getCollectionBooks$ of EkartFacade ', (done) => {
    facade.getCollectionBooks$.subscribe((data) => {
      expect(data[0].id).toBe('ang');
      done();
    });
  });

  it('should call getSearchBooksSuccess$ of EkartFacade ', (done) => {
    facade.getSearchBooksSuccess$.subscribe((data) => {
      expect(data[0].id).toBe('node');
      done();
    });
  });

  it('should spy on dispatch with resetCartItems of EkartFacade ', (done) => {
    facade.resetCartItems();
    expect(mockStore.dispatch).toHaveBeenCalledWith(resetCart());
    done();
  });

  it('should spy on dispatch with updateCartBadge of EkartFacade ', (done) => {
    facade.updateCartBadge();
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateCartBadge());
    done();
  });

  it('should spy on dispatch with resetCartItems of EkartFacade ', (done) => {
    facade.resetCartItems();
    expect(mockStore.dispatch).toHaveBeenCalledWith(resetCart());
    done();
  });

  it('should spy on dispatch with addToCollection of EkartFacade ', (done) => {
    const store = {
      ...initialState,
      cartItems: [{ id: '1' }],
    };
    facade.addToCollection(store.cartItems);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddToCollection({ payload: [{ id: '1' }] })
    );
    done();
  });

  it('should spy on dispatch with loadSearchBooks of EkartFacade ', (done) => {
    facade.loadSearchBooks('angular');
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      loadSearchBooks({ searchString: 'angular' })
    );
    done();
  });

  it('should spy on dispatch with addToCart of EkartFacade ', (done) => {
    facade.addToCart(bookInfo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddToCartSuccess({ payload: bookInfo })
    );
    done();
  });

  it('should spy on dispatch with deleteCartItem of EkartFacade ', (done) => {
    facade.deleteCartItem({ id: '1' });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      deleteCartItem({ payload: '1' })
    );
    done();
  });

  it('should spy on dispatch with loadSearchBooks of EkartFacade ', (done) => {
    facade.getBookInfo(bookInfo.id);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      getBookInfo({ bookId: 'angular' })
    );
    done();
  });
});
