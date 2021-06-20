import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookinfoComponent } from './bookinfo/bookinfo.component';
import { SharedBookinfoRoutingModule } from './shared-bookinfo.routing.module';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { SharedStarRatingModule } from '@ecommerce/shared/star-rating';
import { SharedEkartStoreModule } from '@ecommerce/shared/ekart-store';

@NgModule({
  imports: [
    CommonModule,
    SharedBookinfoRoutingModule,
    SharedMaterialModule,
    SharedStarRatingModule,
    SharedEkartStoreModule,
  ],
  declarations: [BookinfoComponent],
})
export class SharedBookinfoModule {}
