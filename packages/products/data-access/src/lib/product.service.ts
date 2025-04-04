import { Injectable } from '@angular/core';
import { DataService } from '@bigi-shop/shared/data-access';
import { GetProductsQuery, ProductListOptions, InputMaybe } from '@bigi-shop/shared/util-types';
import { GET_PRODUCTS } from './product.graphql';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private dataService: DataService) {}

  getProducts(options?: ProductListOptions) {
    return this.dataService.watchQuery<GetProductsQuery>(
      GET_PRODUCTS,
      { options: options as InputMaybe<ProductListOptions> }
    );
  }
} 