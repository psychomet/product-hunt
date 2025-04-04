import { gql } from "apollo-angular";

export const ERROR_RESULT_FRAGMENT = gql`
  fragment ErrorResult on ErrorResult {
    errorCode
    message
  }
`;

export const USER_FRAGMENT = gql`
  fragment User on CurrentUser {
    id
    identifier
    verified
    firstName
    lastName
    emailAddress
  }
`; 