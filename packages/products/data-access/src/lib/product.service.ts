import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from '@product-hunt/shared-data-access';
import { GetProductsQuery, InputMaybe,ProductListOptions } from '@product-hunt/shared-util-types';

import { GET_PRODUCTS } from './product.graphql';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private dataService: DataService) {}

  getProducts(options?: ProductListOptions): Observable<GetProductsQuery> {
    return this.dataService.watchQuery<GetProductsQuery>(
      GET_PRODUCTS,
      { options: options as InputMaybe<ProductListOptions> }
    );
  }
} 