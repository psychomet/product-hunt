import { gql } from 'apollo-angular';

export const GET_PRODUCTS = gql`
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