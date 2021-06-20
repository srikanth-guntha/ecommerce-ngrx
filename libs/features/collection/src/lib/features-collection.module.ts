import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MycollectionComponent } from './mycollection/mycollection.component';
import { FeaturesCollectionRoutingModule } from './features-collection.routing.module';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';

@NgModule({
  imports: [CommonModule, FeaturesCollectionRoutingModule, UiMatCardListModule],
  declarations: [MycollectionComponent],
})
export class FeaturesCollectionModule {}
