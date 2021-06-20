import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { RouterModule } from '@angular/router';
import { SharedServicesModule } from '@ecommerce/shared/services';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    SharedServicesModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class UiNavbarModule {}
