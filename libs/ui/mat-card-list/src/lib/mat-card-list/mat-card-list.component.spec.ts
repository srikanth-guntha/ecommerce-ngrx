import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { MatCardListComponent } from './mat-card-list.component';
import { Router } from '@angular/router';
import { deleteCartItem, EkartFacade } from '@ecommerce/shared/ekart-store';
import { By } from '@angular/platform-browser';

const mockEkartFacade = {
  deleteCartItem: () => {
    return;
  },
  updateCartBadge: () => {
    return;
  },
};
const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};
describe('MatCardListComponent', () => {
  let component: MatCardListComponent;
  let fixture: ComponentFixture<MatCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatCardListComponent],
      imports: [SharedMaterialModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: EkartFacade, useValue: mockEkartFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardListComponent);
    component = fixture.componentInstance;
    component.errorMessage = '';
    fixture.detectChanges();
  });

  it('should create a matCardList component', () => {
    expect(component).toBeTruthy();
  });

  it('should spy on navigate of router ', () => {
    component.bookList = [{ id: '12' }];
    fixture.detectChanges();
    const Ele = fixture.debugElement.query(By.css('.book-card'));
    Ele.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should spy on delete cart Items of facade', () => {
    component.bookList = [{ id: '12' }];
    spyOn(mockEkartFacade, 'deleteCartItem');
    component.showDelete = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.delete-button')).nativeElement.click();
    expect(mockEkartFacade.deleteCartItem).toHaveBeenCalled();
  });

  it('should spy on updateCartBadge ', () => {
    component.bookList = [{ id: '12' }];
    spyOn(mockEkartFacade, 'updateCartBadge');
    component.showDelete = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.delete-button')).nativeElement.click();
    expect(mockEkartFacade.updateCartBadge).toHaveBeenCalled();
  });
  it('trackBy should return string ', () => {
    expect(component.trackByFn(1, { id: 'angular' })).toBe('angular');
  });
});
