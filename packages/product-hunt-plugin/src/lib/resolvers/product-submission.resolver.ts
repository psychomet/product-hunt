import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Ctx, RequestContext, TransactionalConnection } from '@vendure/core';
import { ProductSubmissionService } from '../services/product-submission.service';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Resolver()
export class ProductSubmissionResolver {
  constructor(
    private productSubmissionService: ProductSubmissionService,
    private connection: TransactionalConnection
  ) {}

  @Mutation()
  async submitProduct(
    @Ctx() ctx: RequestContext,
    @Args()
    args: {
      input: {
        name: string;
        description: string;
        websiteUrl: string;
        makers: string[];
        launchDate?: Date;
      };
    }
  ) {
    if (!ctx.activeUserId) {
      throw new Error('You must be logged in to submit a product');
    }

    const customer = await this.connection.getRepository(Customer).findOne({
      where: { id: ctx.activeUserId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    return this.productSubmissionService.submitProduct(customer, {
      name: args.input.name,
      description: args.input.description,
      websiteUrl: args.input.websiteUrl,
      makers: args.input.makers,
      launchDate: args.input.launchDate,
    });
  }
}
