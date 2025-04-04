import { gql } from 'apollo-angular';
import { ERROR_RESULT_FRAGMENT, USER_FRAGMENT } from './fragments';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $email, password: $password, rememberMe: $rememberMe) {
      ... on CurrentUser {
        ...User
      }
      ... on ErrorResult {
        ...ErrorResult
      }
    }
  }
  ${USER_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

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

export const VERIFY = gql`
  mutation Verify($token: String!, $password: String!) {
    verifyCustomerAccount(token: $token, password: $password) {
      ... on CurrentUser {
        ...User
      }
      ... on ErrorResult {
        ...ErrorResult
      }
    }
  }
  ${USER_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`; 