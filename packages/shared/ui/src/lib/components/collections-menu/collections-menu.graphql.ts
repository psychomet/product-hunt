import { gql } from 'apollo-angular';

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