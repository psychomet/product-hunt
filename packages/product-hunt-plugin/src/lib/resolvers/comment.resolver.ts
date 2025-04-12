import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Ctx,
  ID,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';
import { CommentService } from '../services/comment.service';
import { Product } from '@vendure/core/dist/entity/product/product.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Resolver()
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private connection: TransactionalConnection
  ) {}

  @Query()
  async comments(@Ctx() ctx: RequestContext, @Args('productId') productId: ID) {
    return this.commentService.getComments(Number(productId));
  }

  @Mutation()
  async createComment(
    @Ctx() ctx: RequestContext,
    @Args()
    args: {
      productId: ID;
      content: string;
      parentCommentId?: ID;
    }
  ) {
    const customer = ctx.activeUserId
      ? await this.connection.getRepository(Customer).findOne({
          where: { id: ctx.activeUserId },
        })
      : null;

    if (!customer) {
      throw new Error('You must be logged in to comment');
    }

    const product = await this.connection.getRepository(Product).findOne({
      where: { id: args.productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.commentService.createComment(
      product,
      customer,
      args.content,
      args.parentCommentId ? Number(args.parentCommentId) : undefined
    );
  }

  @Mutation()
  async upvoteComment(
    @Ctx() ctx: RequestContext,
    @Args('commentId') commentId: ID
  ) {
    const customer = ctx.activeUserId
      ? await this.connection.getRepository(Customer).findOne({
          where: { id: ctx.activeUserId },
        })
      : null;

    if (!customer) {
      throw new Error('You must be logged in to upvote');
    }

    return this.commentService.upvoteComment(Number(commentId), customer);
  }

  @Mutation()
  async reportComment(
    @Ctx() ctx: RequestContext,
    @Args()
    args: {
      commentId: ID;
      reason: string;
    }
  ) {
    const customer = ctx.activeUserId
      ? await this.connection.getRepository(Customer).findOne({
          where: { id: ctx.activeUserId },
        })
      : null;

    if (!customer) {
      throw new Error('You must be logged in to report');
    }

    return this.commentService.reportComment(
      Number(args.commentId),
      customer,
      args.reason
    );
  }

  @Query()
  async hasUpvotedComment(
    @Ctx() ctx: RequestContext,
    @Args('commentId') commentId: ID
  ) {
    const customer = ctx.activeUserId
      ? await this.connection.getRepository(Customer).findOne({
          where: { id: ctx.activeUserId },
        })
      : null;

    if (!customer) {
      return false;
    }

    return this.commentService.hasUpvoted(
      Number(commentId),
      Number(customer.id)
    );
  }
}
