import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FeaturesCartRoutingModule } from './features-cart.routing.module';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';

@NgModule({
  imports: [
    CommonModule,
    FeaturesCartRoutingModule,
    SharedMaterialModule,
    UiMatCardListModule,
  ],
  declarations: [CartComponent],
})
export class FeaturesCartModule {}
