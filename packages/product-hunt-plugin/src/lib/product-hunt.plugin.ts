import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities/comment.entity';
import { CommentReport } from './entities/comment-report.entity';
import { CommentUpvote } from './entities/comment-upvote.entity';
import { Upvote } from './entities/upvote.entity';
import { CommentResolver } from './resolvers/comment.resolver';
import { ProductSubmissionResolver } from './resolvers/product-submission.resolver';
import { UpvoteResolver } from './resolvers/upvote.resolver';
import { productHuntSchema } from './schema/product-hunt.schema';
import { CommentService } from './services/comment.service';
import { ProductSubmissionService } from './services/product-submission.service';
import { UpvoteService } from './services/upvote.service';

@VendurePlugin({
  imports: [
    PluginCommonModule,
    TypeOrmModule.forFeature([Upvote, Comment, CommentUpvote, CommentReport]),
  ],
  providers: [UpvoteService, ProductSubmissionService, CommentService],
  adminApiExtensions: {
    schema: productHuntSchema,
    resolvers: [UpvoteResolver, ProductSubmissionResolver, CommentResolver],
  },
  shopApiExtensions: {
    schema: productHuntSchema,
    resolvers: [UpvoteResolver, ProductSubmissionResolver, CommentResolver],
  },
})
export class ProductHuntPlugin {}
