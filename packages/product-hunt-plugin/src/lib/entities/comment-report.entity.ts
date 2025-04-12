import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Comment } from './comment.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Entity()
export class CommentReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment)
  comment: Comment;

  @ManyToOne(() => Customer)
  reporter: Customer;

  @Column('text')
  reason: string;

  @Column({ default: false })
  isResolved: boolean;
}
