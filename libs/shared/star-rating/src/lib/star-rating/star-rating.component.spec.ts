import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      imports: [SharedMaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' stars length should be 5', () => {
    expect(component.stars.length).toBe(5);
  });

  it(' selectedRating should be zero on load', () => {
    expect(component.selectedRating).toBe(0);
  });

  it('selectedRating should be 5 if fifth star element is clicked', () => {
    const starElemets = fixture.debugElement.queryAll(By.css('.star'));
    starElemets[4].nativeElement.click();
    fixture.detectChanges();
    expect(component.selectedRating).toBe(5);
  });

  it('selectedRating should be 0 if value is negative', () => {
    component.stars[0].id = -1;
    component.selectStar(0);
    fixture.detectChanges();
    expect(component.selectedRating).toBe(0);
  });
});
