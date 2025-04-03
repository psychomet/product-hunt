import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/:slug', component: ProductDetailComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
