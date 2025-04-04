import { Routes } from '@angular/router';
import { ProductListComponent, ProductDetailComponent } from '@bigi-shop/products-feature';
import { accountRoutes } from '@bigi-shop/account-feature';
import { ShellLayoutComponent } from '../shell-feature/shell-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'product/:slug', component: ProductDetailComponent },
      {
        path: 'account',
        children: accountRoutes
      },
      { path: '', redirectTo: '/products', pathMatch: 'full' }
    ]
  }
]; 