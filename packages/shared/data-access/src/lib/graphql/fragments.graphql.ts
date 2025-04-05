import { gql } from 'apollo-angular';

export const ASSET_FRAGMENT = gql`
  fragment Asset on Asset {
    id
    width
    height
    name
    preview
    focalPoint {
      x
      y
    }
  }
`;

export const CART_FRAGMENT = gql`
  fragment Cart on Order {
    id
    code
    state
    active
    updatedAt
    orderPlacedAt
    lines {
      id
      featuredAsset {
        ...Asset
      }
      unitPrice
      unitPriceWithTax
      quantity
      linePriceWithTax
      discountedLinePriceWithTax
      productVariant {
        id
        name
      }
      discounts {
        amount
        amountWithTax
        description
        adjustmentSource
        type
      }
    }
    totalQuantity
    subTotal
    subTotalWithTax
    total
    totalWithTax
    shipping
    shippingWithTax
    shippingLines {
      priceWithTax
      shippingMethod {
        id
        code
        name
        description
      }
    }
    discounts {
      amount
      amountWithTax
      description
      adjustmentSource
      type
    }
  }
  ${ASSET_FRAGMENT}
`;
