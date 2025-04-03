import { Routes } from '@angular/router';
import { ProductListComponent, ProductDetailComponent } from '@bigi-shop/products/feature';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/:slug', component: ProductDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
