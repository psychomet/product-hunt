import { gql } from '@apollo/client/core';

export const GET_COLLECTIONS = gql`
  query GetCollections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        parent {
          id
          slug
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    search(input: { 
      take: 8,
      groupByProduct: true,
      sort: { price: ASC }
    }) {
      items {
        productId
        productName
        slug
        description
        productAsset {
          preview
          focalPoint {
            x
            y
          }
        }
        price {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        currencyCode
        inStock
      }
    }
  }
`; 