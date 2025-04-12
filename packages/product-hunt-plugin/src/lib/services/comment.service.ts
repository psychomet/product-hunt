import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentUpvote } from '../entities/comment-upvote.entity';
import { CommentReport } from '../entities/comment-report.entity';
import { Product } from '@vendure/core/dist/entity/product/product.entity';
import { Customer } from '@vendure/core/dist/entity/customer/customer.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(CommentUpvote)
    private commentUpvoteRepository: Repository<CommentUpvote>,
    @InjectRepository(CommentReport)
    private commentReportRepository: Repository<CommentReport>
  ) {}

  async createComment(
    product: Product,
    customer: Customer,
    content: string,
    parentCommentId?: number
  ): Promise<Comment> {
    const comment = new Comment();
    comment.product = product;
    comment.customer = customer;
    comment.content = content;
    comment.upvotes = 0;
    comment.reports = 0;
    comment.isReported = false;

    if (parentCommentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: parentCommentId },
      });
      if (parentComment) {
        comment.parentComment = parentComment;
      }
    }

    return this.commentRepository.save(comment);
  }

  async upvoteComment(commentId: number, customer: Customer): Promise<boolean> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    const existingUpvote = await this.commentUpvoteRepository.findOne({
      where: {
        comment: { id: commentId },
        customer: { id: customer.id },
      },
    });

    if (existingUpvote) {
      await this.commentUpvoteRepository.remove(existingUpvote);
      comment.upvotes--;
      await this.commentRepository.save(comment);
      return false;
    }

    const upvote = new CommentUpvote();
    upvote.comment = comment;
    upvote.customer = customer;
    await this.commentUpvoteRepository.save(upvote);

    comment.upvotes++;
    await this.commentRepository.save(comment);
    return true;
  }

  async reportComment(
    commentId: number,
    reporter: Customer,
    reason: string
  ): Promise<CommentReport> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    const report = new CommentReport();
    report.comment = comment;
    report.reporter = reporter;
    report.reason = reason;
    report.isResolved = false;

    comment.reports++;
    if (comment.reports >= 3) {
      comment.isReported = true;
    }
    await this.commentRepository.save(comment);

    return this.commentReportRepository.save(report);
  }

  async getComments(productId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        product: { id: productId },
        parentComment: IsNull(),
      },
      relations: ['customer', 'replies', 'replies.customer'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getCommentUpvotes(commentId: number): Promise<number> {
    return this.commentUpvoteRepository.count({
      where: {
        comment: { id: commentId },
      },
    });
  }

  async hasUpvoted(commentId: number, customerId: number): Promise<boolean> {
    const upvote = await this.commentUpvoteRepository.findOne({
      where: {
        comment: { id: commentId },
        customer: { id: customerId },
      },
    });
    return !!upvote;
  }
}
