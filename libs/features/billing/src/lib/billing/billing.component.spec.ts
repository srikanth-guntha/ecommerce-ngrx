import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { BillingComponent } from './billing.component';
import { Store, StoreModule } from '@ngrx/store';
import { EkartFacade, EkartReducer } from '@ecommerce/shared/ekart-store';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const mockEkartFacade = {
  getCartItems$: of([{ id: 'angular' }, { id: 'node' }]),
  getCollectionBooks$: of([{ id: 'angular' }, { id: 'node' }, { id: 'jest' }]),
  addToCollection: () => {
    return;
  },
  resetCartItems: () => {
    return;
  },
  updateCartBadge: () => {
    return;
  },
};
describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedMaterialModule,
        StoreModule.forRoot({ shoppingList: EkartReducer }),
      ],
      providers: [Store, { provide: EkartFacade, useValue: mockEkartFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create billing component', () => {
    expect(component).toBeTruthy();
  });
  it('should cartItems length should be 2 on page load', () => {
    expect(component.cartItems.length).toBe(2);
  });
});

describe('BillingComponent submit actions', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedMaterialModule,
        StoreModule.forRoot({ shoppingList: EkartReducer }),
      ],
      providers: [
        Store,
        { provide: EkartFacade, useValue: mockEkartFacade },
        MatDialog,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
    component.billingForm.controls.name.setValue('sss');
    component.billingForm.controls.email.setValue('sss@gmail.com');
    component.billingForm.controls.phone.setValue('1234567890');
    component.billingForm.controls.address.setValue('hyderabad');
  });

  it('should spy on addToCollection', () => {
    spyOn(mockEkartFacade, 'addToCollection');
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.buy-button'));
    Ele.nativeElement.click();
    expect(mockEkartFacade.addToCollection).toHaveBeenCalled();
  });

  it('should spy on addToCollection', () => {
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.buy-button'));
    Ele.nativeElement.click();
    expect(component.booksCollection.length).toBe(3);
  });
  it('should spy on resetCartItems', () => {
    spyOn(mockEkartFacade, 'resetCartItems');
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.buy-button'));
    Ele.nativeElement.click();
    expect(mockEkartFacade.resetCartItems).toHaveBeenCalled();
  });

  it('should spy on updateCartBadge', () => {
    spyOn(mockEkartFacade, 'updateCartBadge');
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.buy-button'));
    Ele.nativeElement.click();
    expect(mockEkartFacade.updateCartBadge).toHaveBeenCalled();
  });
  it('should spy on MatDialog open', () => {
    spyOn(matDialog, 'open');
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.buy-button'));
    Ele.nativeElement.click();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
