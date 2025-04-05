import { gql } from '@apollo/client/core';

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
      id
      name
      description
      featuredAsset {
        id
        preview
      }
      variants {
        id
        name
        sku
        price
        priceWithTax
        stockLevel
        featuredAsset {
          id
          preview
        }
      }
      collections {
        id
        name
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: ID!, $qty: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $qty) {
      ... on Order {
        id
        totalQuantity
        lines {
          id
          quantity
          productVariant {
            id
            name
            price
            priceWithTax
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`; 