import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@vendure/core/dist/entity/product/product.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Entity()
export class Upvote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Customer)
  customer: Customer;
}
