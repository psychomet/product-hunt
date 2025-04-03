import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      variants {
        id
        name
        price
        currencyCode
        priceWithTax
        sku
        stockLevel
      }
    }
  }
`;

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
  constructor(
    private apollo: Apollo
  ) {}

  getProduct(slug: string): Observable<ProductDetail> {
    return this.apollo.watchQuery<ProductDetailResponse>({
      query: GET_PRODUCT,
      variables: { slug }
    })
    .valueChanges
    .pipe(
      map(result => result.data.product)
    );
  }
} 