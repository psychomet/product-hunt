import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';

export const REGISTER = gql`
  mutation Register($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success {
        success
      }
      ... on ErrorResult {
        ...ErrorResult
      }
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`; 