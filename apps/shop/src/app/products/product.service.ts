import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GetProductsQuery, ProductListOptions, InputMaybe } from '../common/generated-types';

const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
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
        }
      }
      totalItems
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apollo: Apollo
  ) {}

  getProducts(options?: ProductListOptions): Observable<GetProductsQuery['products']> {
    return this.apollo.watchQuery<GetProductsQuery>({
      query: GET_PRODUCTS,
      variables: { options: options as InputMaybe<ProductListOptions> }
    })
    .valueChanges
    .pipe(
      map(result => result.data.products)
    );
  }
} 