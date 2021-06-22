import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EkartFacade, EkartReducer } from '@ecommerce/shared/ekart-store';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '@ecommerce/ui/navbar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [
        StoreModule.forRoot({ shoppingList: EkartReducer }),
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedMaterialModule,
      ],
      providers: [EkartFacade],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ekart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ekart');
  });
});
