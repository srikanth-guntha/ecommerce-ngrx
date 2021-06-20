import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { EkartFacade } from '@ecommerce/shared/ekart-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';
import { SearchComponent } from './search.component';
import { async, of } from 'rxjs';
import { By } from '@angular/platform-browser';

const mockEkartFacade = {
  getSearchString$: of('angular'),
  getSearchBooksSuccess$: of([{ id: 'angular', volumeInfo: { authors: [] } }]),
  loadSearchBooks(searchString: string) {
    return;
  },
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedMaterialModule,
        UiMatCardListModule,
      ],
      providers: [Store, { provide: EkartFacade, useValue: mockEkartFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Search component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSearchBooksSuccess$ on load', (done) => {
    mockEkartFacade.getSearchBooksSuccess$.subscribe((data) => {
      expect(component.searchBooks).toEqual(data);
      done();
    });
  });

  it('search String should be angular on load', () => {
    spyOn(mockEkartFacade, 'loadSearchBooks');
    const Ele = fixture.debugElement.query(By.css('#searchVal'));
    Ele.nativeElement.value = 'q';
    Ele.nativeElement.dispatchEvent(new KeyboardEvent('change'));
    expect(mockEkartFacade.loadSearchBooks).toHaveBeenCalled();
  });
});
