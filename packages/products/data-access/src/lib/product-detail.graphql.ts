import { gql } from 'apollo-angular';

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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