import { gql } from 'apollo-angular';

import { ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';

export const VERIFY = gql`
  mutation Verify($token: String!, $password: String!) {
    verifyCustomerAccount(token: $token, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        ...ErrorResult
      }
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`; 