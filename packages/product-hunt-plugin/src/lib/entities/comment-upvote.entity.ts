import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Entity()
export class CommentUpvote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment)
  comment: Comment;

  @ManyToOne(() => Customer)
  customer: Customer;
}
