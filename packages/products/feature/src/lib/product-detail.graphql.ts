import { gql } from '@apollo/client/core';
import {
  CART_FRAGMENT,
  ERROR_RESULT_FRAGMENT,
} from '@bigi-shop/shared-data-access';

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
      ...Cart
      ...ErrorResult
      ... on InsufficientStockError {
        order {
          ...Cart
        }
      }
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}  
`;
