import { gql } from '@apollo/client/core';

import {
  CART_FRAGMENT,
  ERROR_RESULT_FRAGMENT,
  ORDER_ADDRESS_FRAGMENT,
} from '@product-hunt/shared-data-access';

export const GET_ORDER_FOR_CHECKOUT = gql`
  query GetOrderForCheckout {
    activeOrder {
      ...Cart
      shippingAddress {
        ...OrderAddress
      }
    }
  }
  ${CART_FRAGMENT}
  ${ORDER_ADDRESS_FRAGMENT}
`;

export const GET_ORDER_SHIPPING_DATA = gql`
  query GetOrderShippingData {
    activeOrder {
      id
      customer {
        id
        firstName
        lastName
        emailAddress
      }
      shippingAddress {
        ...OrderAddress
      }
    }
  }
  ${ORDER_ADDRESS_FRAGMENT}
`;

export const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ...Cart
      ... on Order {
        shippingAddress {
          ...OrderAddress
        }
      }
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ORDER_ADDRESS_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = gql`
  query GetEligibleShippingMethods {
    eligibleShippingMethods {
      id
      name
      description
      price
      priceWithTax
      metadata
    }
  }
`;

export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($id: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $id) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const SET_CUSTOMER_FOR_ORDER = gql`
  mutation SetCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ... on Order {
        id
        customer {
          id
          emailAddress
          firstName
          lastName
        }
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const TRANSITION_TO_ARRANGING_PAYMENT = gql`
  mutation TransitionToArrangingPayment {
    transitionOrderToState(state: "ArrangingPayment") {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ELIGIBLE_PAYMENT_METHODS = gql`
  query GetEligiblePaymentMethods {
    eligiblePaymentMethods {
      id
      code
      eligibilityMessage
      isEligible
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation AddPayment($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ORDER_BY_CODE = gql`
  query GetOrderByCode($code: String!) {
    orderByCode(code: $code) {
      ...Cart
      updatedAt
      customer {
        id
        emailAddress
        firstName
        lastName
        user {
          id
          identifier
          verified
        }
      }
    }
  }
  ${CART_FRAGMENT}
`;
