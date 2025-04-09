import { gql } from 'apollo-angular';

import { ERROR_RESULT_FRAGMENT, USER_FRAGMENT } from './fragments';

export const LOGIN = gql`
  mutation SharedDataAccessLogin($username: String!, $password: String!, $rememberMe: Boolean!) {
    login(username: $username, password: $password, rememberMe: $rememberMe) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const VERIFY = gql`
  mutation SharedDataAccessVerify($token: String!) {
    verifyCustomerAccount(token: $token) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`; 