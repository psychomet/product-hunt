import { gql } from 'apollo-angular';
import { CART_FRAGMENT } from './fragments.graphql';

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      ...Cart
    }
  }
  ${CART_FRAGMENT}
`;