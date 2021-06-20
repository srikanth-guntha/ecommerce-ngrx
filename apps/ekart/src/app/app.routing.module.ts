import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'search',
    loadChildren: () =>
      import('@ecommerce/features/search').then((m) => m.FeaturesSearchModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('@ecommerce/features/cart').then((m) => m.FeaturesCartModule),
  },
  {
    path: 'collection',
    loadChildren: () =>
      import('@ecommerce/features/collection').then(
        (m) => m.FeaturesCollectionModule
      ),
  },
  {
    path: 'bookinfo',
    loadChildren: () =>
      import('@ecommerce/shared/bookinfo').then((m) => m.SharedBookinfoModule),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('@ecommerce/features/billing').then(
        (m) => m.FeaturesBillingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
