import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EkartFacade, EkartReducer } from '@ecommerce/shared/ekart-store';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CartComponent } from './cart.component';
import { BillingComponent } from '@ecommerce/features/billing';

const mockEkartFacade = {
  getCartItems$: of([{ id: 1 }, { id: '2' }]),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'billing', component: BillingComponent },
        ]),
        SharedMaterialModule,
        UiMatCardListModule,
        StoreModule.forRoot({ shoppingList: EkartReducer }),
      ],
      providers: [
        Store,
        { provide: EkartFacade, useValue: mockEkartFacade },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create cart component', () => {
    expect(component).toBeTruthy();
  });

  it('cartItems length should be 2 on load', () => {
    mockEkartFacade.getCartItems$.subscribe(() => {
      expect(component.cartItems.length).toBe(2);
    });
  });

  it('should spy on navigate method of router', () => {
    component.cartItems.length = 2;
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.purchase-button'));
    Ele.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
