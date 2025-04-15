import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@product-hunt/shared-data-access';
import { 
  Comment,
  Product,
  ProductList,
  SubmitProductInput
} from '@product-hunt/shared-util-types';

import { 
  CREATE_COMMENT,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_SUBMISSIONS,
  SUBMIT_PRODUCT,
  UPVOTE_COMMENT,
  UPVOTE_PRODUCT
} from '../graphql/product-hunt.graphql';

@Injectable({
  providedIn: 'root'
})
export class ProductHuntService {
  constructor(private dataService: DataService) {}

  getProducts(): Observable<{ products: ProductList }> {
    return this.dataService.query<{ products: ProductList }>(
      GET_PRODUCT_SUBMISSIONS
    );
  }

  getProductDetails(productId: string): Observable<{
    upvoteCount: number;
    hasUpvoted: boolean;
    comments: Comment[];
  }> {
    return this.dataService.query(
      GET_PRODUCT_DETAILS,
      { productId }
    );
  }

  submitProduct(input: SubmitProductInput): Observable<{ submitProduct: Product }> {
    return this.dataService.mutate<{ submitProduct: Product }>(
      SUBMIT_PRODUCT,
      {
        input: {
          name: input.name,
          description: input.description,
          websiteUrl: input.websiteUrl,
          makers: input.makers,
          launchDate: input.launchDate
        }
      }
    );
  }

  upvoteProduct(productId: string): Observable<{ upvoteProduct: boolean }> {
    return this.dataService.mutate<{ upvoteProduct: boolean }>(
      UPVOTE_PRODUCT,
      { productId }
    );
  }

  createComment(
    productId: string, 
    content: string, 
    parentCommentId?: string
  ): Observable<{ createComment: Comment }> {
    return this.dataService.mutate<{ createComment: Comment }>(
      CREATE_COMMENT,
      { productId, content, parentCommentId }
    );
  }

  upvoteComment(commentId: string): Observable<{ upvoteComment: boolean }> {
    return this.dataService.mutate<{ upvoteComment: boolean }>(
      UPVOTE_COMMENT,
      { commentId }
    );
  }
} 