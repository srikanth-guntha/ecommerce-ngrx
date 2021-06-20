import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EkartFacade } from '@ecommerce/shared/ekart-store';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

const mockEkartFacade = {
  getBadgeNumber$: of(2),
};
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        SharedMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: EkartFacade, useValue: mockEkartFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create navbar component', () => {
    expect(component).toBeTruthy();
  });

  it(' navlist length should be 3 ', () => {
    expect(component.navList.length).toBe(3);
  });

  it(' badgeNumber should be 2 ', () => {
    expect(component.badgeNumber).toBe(2);
  });
});
