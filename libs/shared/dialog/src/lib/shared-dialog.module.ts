import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SharedMaterialModule } from '@ecommerce/shared/material';

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [DialogComponent],
})
export class SharedDialogModule {}
