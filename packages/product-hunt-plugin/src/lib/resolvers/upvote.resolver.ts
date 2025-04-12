import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Ctx,
  ID,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';
import { UpvoteService } from '../services/upvote.service';
import { Product } from '@vendure/core/dist/entity/product/product.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Resolver()
export class UpvoteResolver {
  constructor(
    private upvoteService: UpvoteService,
    private connection: TransactionalConnection
  ) {}

  @Mutation()
  async upvoteProduct(
    @Ctx() ctx: RequestContext,
    @Args('productId') productId: ID
  ): Promise<boolean> {
    const customer = ctx.activeUserId
      ? await this.connection.getRepository(Customer).findOne({
          where: { id: ctx.activeUserId },
        })
      : null;

    if (!customer) {
      throw new Error('You must be logged in to upvote');
    }

    const product = await this.connection.getRepository(Product).findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.upvoteService.upvoteProduct(product, customer);
  }

  @Query()
  async upvoteCount(
    @Ctx() ctx: RequestContext,
    @Args('productId') productId: ID
  ): Promise<number> {
    return this.upvoteService.getUpvoteCount(Number(productId));
  }

  @Query()
  async hasUpvoted(
    @Ctx() ctx: RequestContext,
    @Args('productId') productId: ID
  ): Promise<boolean> {
    const customer = ctx.activeUserId
      ? await this.connection.getRepository(Customer).findOne({
          where: { id: ctx.activeUserId },
        })
      : null;

    if (!customer) {
      return false;
    }
    return this.upvoteService.hasUpvoted(
      Number(productId),
      Number(customer.id)
    );
  }
}
