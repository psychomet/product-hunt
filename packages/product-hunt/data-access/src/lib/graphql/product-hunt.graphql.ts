import { gql } from 'apollo-angular';

export const GET_PRODUCT_SUBMISSIONS = gql`
  query GetProductHuntProducts {
    products {
      items {
        id
        name
        description
        variants {
          id
          name
        }
        featuredAsset {
          id
          preview
        }
      }
      totalItems
    }
  }
`;

export const SUBMIT_PRODUCT = gql`
  mutation SubmitProduct($input: SubmitProductInput!) {
    submitProduct(input: $input) {
      id
      enabled
      languageCode
      name
      slug
      description
      customFields {
        upvotes
        launchDate
        status
        websiteUrl
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query GetProductHuntDetails($productId: ID!) {
    upvoteCount(productId: $productId)
    hasUpvoted(productId: $productId)
    comments(productId: $productId) {
      id
      content
      customer {
        id
        firstName
        lastName
      }
      upvotes
      createdAt
      updatedAt
      replies {
        id
        content
        customer {
          id
          firstName
          lastName
        }
        upvotes
        createdAt
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation ProductHuntCreateComment($productId: ID!, $content: String!, $parentCommentId: ID) {
    createComment(
      productId: $productId
      content: $content
      parentCommentId: $parentCommentId
    ) {
      id
      content
      customer {
        id
        firstName
        lastName
      }
      upvotes
      createdAt
      updatedAt
    }
  }
`;

export const UPVOTE_PRODUCT = gql`
  mutation ProductHuntUpvoteProduct($productId: ID!) {
    upvoteProduct(productId: $productId)
  }
`;

export const UPVOTE_COMMENT = gql`
  mutation ProductHuntUpvoteComment($commentId: ID!) {
    upvoteComment(commentId: $commentId)
  }
`; 