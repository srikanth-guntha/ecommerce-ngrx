import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardListComponent } from './mat-card-list/mat-card-list.component';
import { SharedMaterialModule } from '@ecommerce/shared/material';

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [MatCardListComponent],
  exports: [MatCardListComponent],
})
export class UiMatCardListModule {}
