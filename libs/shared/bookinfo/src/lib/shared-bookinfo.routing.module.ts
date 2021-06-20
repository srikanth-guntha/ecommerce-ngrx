import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookinfoComponent } from './bookinfo/bookinfo.component';

const routes: Routes = [{ path: '', component: BookinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedBookinfoRoutingModule {}
