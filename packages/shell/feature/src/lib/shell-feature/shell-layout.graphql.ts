import { gql } from '@apollo/client/core';

export const SIGN_OUT = gql`
  mutation SignOut {
    logout {
      success
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections {
      items {
        id
        name
        slug
        parent {
          id
          name
        }
      }
    }
  }
`; 