import { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';

export const productHuntSchema: DocumentNode = gql`
  extend type Query {
    upvoteCount(productId: ID!): Int!
    hasUpvoted(productId: ID!): Boolean!
    comments(productId: ID!): [Comment!]!
    hasUpvotedComment(commentId: ID!): Boolean!
  }

  extend type Mutation {
    upvoteProduct(productId: ID!): Boolean!
    submitProduct(input: SubmitProductInput!): Product!
    createComment(
      productId: ID!
      content: String!
      parentCommentId: ID
    ): Comment!
    upvoteComment(commentId: ID!): Boolean!
    reportComment(commentId: ID!, reason: String!): CommentReport!
  }

  input SubmitProductInput {
    name: String!
    description: String!
    websiteUrl: String!
    makers: [ID!]! # Array of customer IDs
    launchDate: DateTime
  }

  type Comment {
    id: ID!
    content: String!
    product: Product!
    customer: Customer!
    parentComment: Comment
    replies: [Comment!]!
    upvotes: Int!
    reports: Int!
    isReported: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CommentReport {
    id: ID!
    comment: Comment!
    reporter: Customer!
    reason: String!
    isResolved: Boolean!
  }
`;
