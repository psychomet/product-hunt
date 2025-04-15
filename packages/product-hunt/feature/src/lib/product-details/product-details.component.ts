import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ProductHuntService } from '@product-hunt/product-hunt-data-access';
import { Product } from '@product-hunt/shared-util-types';

@Component({
  selector: 'ph-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ product.name }}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ product.description }}</p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Website</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a [href]="product.customFields?.websiteUrl" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                {{ product.customFields?.websiteUrl }}
              </a>
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Launch Date</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ product.customFields?.launchDate | date }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Upvotes</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                (click)="onUpvote()"
                [disabled]="hasUpvoted"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm"
                [ngClass]="{
                  'text-white bg-indigo-600 hover:bg-indigo-700': !hasUpvoted,
                  'text-gray-700 bg-gray-100': hasUpvoted
                }"
              >
                <span class="mr-1">⬆️</span>
                {{ product.customFields?.upvotes }}
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  hasUpvoted = false;

  constructor(private productHuntService: ProductHuntService) {}

  onUpvote(): void {
    if (!this.hasUpvoted) {
      this.productHuntService.upvoteProduct(this.product.id).subscribe(
        success => {
          if (success) {
            this.hasUpvoted = true;
            if (this.product.customFields) {
              this.product.customFields.upvotes = (this.product.customFields.upvotes || 0) + 1;
            }
          }
        }
      );
    }
  }
} 