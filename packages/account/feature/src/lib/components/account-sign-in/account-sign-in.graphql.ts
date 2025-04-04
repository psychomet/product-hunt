import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT } from '@bigi-shop/shared-data-access';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $email, password: $password, rememberMe: $rememberMe) {
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