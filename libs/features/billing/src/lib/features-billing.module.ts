import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BillingComponent } from './billing/billing.component';
import { FeaturesBillingRoutingModule } from './features-billing.routing.module';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { SharedDialogModule } from '@ecommerce/shared/dialog';
import { SharedServicesModule } from '@ecommerce/shared/services';

@NgModule({
  imports: [
    CommonModule,
    FeaturesBillingRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedDialogModule,
    SharedServicesModule,
  ],
  declarations: [BillingComponent],
  exports: [BillingComponent],
})
export class FeaturesBillingModule {}
