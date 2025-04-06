import { Routes } from '@angular/router';
import {
  ProductListComponent,
  ProductDetailComponent,
} from '@bigi-shop/products-feature';
import { accountRoutes } from '@bigi-shop/account-feature';
import { ShellLayoutComponent } from '../shell-feature/shell-layout.component';
import { HomeComponent } from '../home-feature/home.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'category/:slug',
        component: ProductListComponent,
      },
      {
        path: 'search',
        component: ProductListComponent,
      },
      {
        path: 'product/:slug',
        component: ProductDetailComponent,
      },
      {
        path: 'account',
        children: accountRoutes,
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('@bigi-shop/checkout-feature').then(
            (m) => m.checkoutFeatureRoutes
          ),
      },
    ],
  },
];
