import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { EkartFacade, EkartReducer  } from '@ecommerce/shared/ekart-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';
import { MycollectionComponent } from './mycollection.component';
import { of } from 'rxjs';

const mockEkartFacade = {
  getCollectionBooks$: of( [{id: '1'}, {id: '2'}] )
}

describe('MycollectionComponent', () => {
  let component: MycollectionComponent;
  let fixture: ComponentFixture<MycollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycollectionComponent ],
      imports: [ RouterTestingModule, BrowserAnimationsModule, UiMatCardListModule,SharedMaterialModule, StoreModule.forRoot({ shoppingList: EkartReducer }) ],
      providers:[Store, { provide: EkartFacade, useValue: mockEkartFacade }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create collection component', () => {
    expect(component).toBeTruthy();
  });

  it('should call showCollection on load', () => {
    mockEkartFacade.getCollectionBooks$.subscribe( (data) => {
      expect(component.bookCollection).toBe(data);
    });
  })

});
