import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { FeaturesSearchRoutingModule } from './features-search.routing.module';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesSearchRoutingModule,
    UiMatCardListModule,
  ],
  declarations: [SearchComponent],
})
export class FeaturesSearchModule {}
