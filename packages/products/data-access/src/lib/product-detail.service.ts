import { Injectable } from '@angular/core';

import { DataService } from '@bigi-shop/shared-data-access';
import { GetProductQuery } from '@bigi-shop/shared-util-types';

import { GET_PRODUCT } from './product-detail.graphql';


export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: {
    id: string;
    preview: string;
  };
  variants: Array<{
    id: string;
    name: string;
    price: number;
    currencyCode: string;
    priceWithTax: number;
    sku: string;
    stockLevel?: string;
  }>;
}

interface ProductDetailResponse {
  product: ProductDetail;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  constructor(private dataService: DataService) {}

  getProduct(id: string) {
    return this.dataService.watchQuery<GetProductQuery>(
      GET_PRODUCT,
      { id }
    );
  }
} 