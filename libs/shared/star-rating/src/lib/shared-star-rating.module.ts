import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SharedMaterialModule } from '@ecommerce/shared/material';

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
})
export class SharedStarRatingModule {}
