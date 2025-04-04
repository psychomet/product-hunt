import { Routes } from '@angular/router';
import { ProductListComponent, ProductDetailComponent } from '@bigi-shop/products/feature';
import { authRoutes } from '@bigi-shop/auth/feature';

export const routes: Routes = [
  ...authRoutes,
  { path: 'products', component: ProductListComponent },
  { path: 'product/:slug', component: ProductDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
