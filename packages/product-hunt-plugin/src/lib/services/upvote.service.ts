import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upvote } from '../entities/upvote.entity';
import { Product } from '@vendure/core/dist/entity/product/product.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Injectable()
export class UpvoteService {
  constructor(
    @InjectRepository(Upvote)
    private upvoteRepository: Repository<Upvote>
  ) {}

  async upvoteProduct(product: Product, customer: Customer): Promise<boolean> {
    const existingUpvote = await this.upvoteRepository.findOne({
      where: {
        product: { id: product.id },
        customer: { id: customer.id },
      },
    });

    if (existingUpvote) {
      await this.upvoteRepository.remove(existingUpvote);
      return false;
    }

    const upvote = new Upvote();
    upvote.product = product;
    upvote.customer = customer;
    await this.upvoteRepository.save(upvote);
    return true;
  }

  async getUpvoteCount(productId: number): Promise<number> {
    return this.upvoteRepository.count({
      where: {
        product: { id: productId },
      },
    });
  }

  async hasUpvoted(productId: number, customerId: number): Promise<boolean> {
    const upvote = await this.upvoteRepository.findOne({
      where: {
        product: { id: productId },
        customer: { id: customerId },
      },
    });
    return !!upvote;
  }
}
