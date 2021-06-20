import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookinfoComponent } from './bookinfo.component';
import { StarRatingComponent } from '@ecommerce/shared/star-rating';
import { of } from 'rxjs';
import { EkartFacade } from '@ecommerce/shared/ekart-store';
import { By } from '@angular/platform-browser';

const mockActivatedRoute = {
  snapshot: {
    queryParamMap: {
      get: () => {
        return 'angular';
      },
    },
  },
};
const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockEkartFacade = {
  getCartItems$: of([{ id: '12' }, { id: '13' }, { id: '13' }]),
  updateCartBadge: () => {
    return;
  },
  getBookInfo: () => {
    return;
  },
  showBookInfo$: of({ id: 'angular' }),
  addToCart: () => {
    return;
  },
};

describe('BookinfoComponent', () => {
  let component: BookinfoComponent;
  let fixture: ComponentFixture<BookinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookinfoComponent, StarRatingComponent],
      imports: [HttpClientTestingModule, RouterModule, SharedMaterialModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: EkartFacade, useValue: mockEkartFacade },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create bookinfo component', () => {
    expect(component).toBeTruthy();
  });

  it('bookid should be angular on load', () => {
    expect(component.bookId).toBe('angular');
  });

  it('should spy on getBookInfo', () => {
    spyOn(mockEkartFacade, 'getBookInfo');
    component.ngOnInit();
    expect(mockEkartFacade.getBookInfo).toHaveBeenCalled();
  });

  it('should get showBookInfo$ response', () => {
    mockEkartFacade.showBookInfo$.subscribe((data) => {
      expect(component.bookInfo).toBe(data);
    });
  });

  it('should spy on addToCart', () => {
    component.bookInfo.id = 'angular';
    spyOn(mockEkartFacade, 'addToCart');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.add-to-cart')).nativeElement.click();
    expect(mockEkartFacade.addToCart).toHaveBeenCalled();
  });

  it('cartItems length should be 3 after click on AddToCart', (done) => {
    component.bookInfo.id = 'angular';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.add-to-cart')).nativeElement.click();
    mockEkartFacade.getCartItems$.subscribe(() => {
      expect(component.cartItems.length).toBe(3);
      done();
    });
  });

  it('cartItems length should be 3 after click on Buy', (done) => {
    component.bookInfo.id = 'angular';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.buy-button')).nativeElement.click();
    mockEkartFacade.getCartItems$.subscribe(() => {
      expect(component.cartItems.length).toBe(3);
      done();
    });
  });
  it('should spy on navigate', () => {
    component.bookInfo.id = 'angular';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.buy-button')).nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
