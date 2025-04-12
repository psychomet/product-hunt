import { gql } from 'apollo-angular';

import {
  CART_FRAGMENT,
  ERROR_RESULT_FRAGMENT,
} from '@product-hunt/shared-data-access';

export const SIGN_OUT = gql`
  mutation ShellLayoutSignOut {
    logout {
      success
    }
  }
`;


export const ADJUST_ITEM_QUANTITY = gql`
  mutation AdjustItemQuantity($id: ID!, $qty: Int!) {
    adjustOrderLine(orderLineId: $id, quantity: $qty) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($id: ID!) {
    removeOrderLine(orderLineId: $id) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;
