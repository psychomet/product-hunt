import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
