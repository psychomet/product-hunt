import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService, StateService } from '@bigi-shop/shared-data-access';
import { GET_PRODUCT_DETAIL, ADD_TO_CART } from './product-detail.graphql';

interface Variant {
  id: string;
  name: string;
  sku: string;
  price: number;
  priceWithTax: number;
  stockLevel: string;
  featuredAsset?: {
    id: string;
    preview: string;
  };
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  breadcrumbs: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  description: string;
  featuredAsset?: {
    id: string;
    preview: string;
  };
  variants: Variant[];
  collections: Collection[];
}

@Component({
  selector: 'lib-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumbs -->
      <nav class="py-4" *ngIf="breadcrumbs()">
        <ol class="flex space-x-2 text-sm text-gray-500">
          <li *ngFor="let crumb of breadcrumbs(); let last = last">
            <div class="flex items-center">
              <a
                [routerLink]="last ? null : ['/category', crumb.slug]"
                [class.text-gray-900]="last"
                [class.font-medium]="last"
                >{{ crumb.name }}</a
              >
              <span *ngIf="!last" class="mx-2">/</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <div class="flex flex-col-reverse">
          <div class="aspect-w-1 aspect-h-1 w-full">
            <img
              *ngIf="selectedAsset()"
              [src]="selectedAsset()?.preview"
              [alt]="product()?.name"
              class="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
            {{ product()?.name }}
          </h1>

          <div class="mt-3">
            <p class="text-3xl text-gray-900">
              {{ selectedVariant()?.priceWithTax | currency }}
            </p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>
            <div
              class="text-base text-gray-700"
              [innerHTML]="product()?.description"
            ></div>
          </div>

          <div class="mt-6">
            <div class="flex items-center">
              <h3 class="text-sm text-gray-900 font-medium">SKU:</h3>
              <p class="ml-2 text-sm text-gray-500">
                {{ selectedVariant()?.sku }}
              </p>
            </div>
          </div>

          <form class="mt-6">
            <!-- Variants -->
            <div *ngIf="product()?.variants.length > 1">
              <label
                class="block text-sm font-medium text-gray-700"
                for="variant"
              >
                Select option
              </label>
              <select
                id="variant"
                [(ngModel)]="selectedVariantId"
                name="variant"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option
                  *ngFor="let variant of product()?.variants"
                  [value]="variant.id"
                >
                  {{ variant.name }}
                </option>
              </select>
            </div>

            <!-- Add to cart -->
            <div class="mt-10 flex sm:flex-col1">
              <button
                type="submit"
                [disabled]="inFlight()"
                (click)="addToCart()"
                class="max-w-xs flex-1 bg-primary-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full"
                [class.opacity-50]="inFlight()"
              >
                <div
                  *ngIf="!qtyInCart()[selectedVariantId()]; else inCartCount"
                >
                  Add to cart
                </div>
                <ng-template #inCartCount>
                  <span>{{ qtyInCart()[selectedVariantId()] }} in cart</span>
                </ng-template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private stateService = inject(StateService);
  // State
  product = signal<Product | null>(null);
  selectedVariantId = signal<string>('');
  qtyInCart = signal<{ [id: string]: number }>({});
  inFlight = signal(false);

  // Computed
  selectedVariant = computed(() => {
    const product = this.product();
    if (!product) return null;
    return (
      product.variants.find((v) => v.id === this.selectedVariantId()) ||
      product.variants[0]
    );
  });

  selectedAsset = computed(() => {
    const variant = this.selectedVariant();
    const product = this.product();
    return variant?.featuredAsset || product?.featuredAsset;
  });

  breadcrumbs = computed(() => {
    const product = this.product();
    if (!product) return null;

    const collection = this.getMostRelevantCollection(product.collections);
    return collection?.breadcrumbs || [];
  });

  constructor() {
    // Effect for fetching product details
    effect(() => {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (!slug) return;

      this.dataService
        .query<{ product: Product }>(GET_PRODUCT_DETAIL, { slug })
        .subscribe(({ product }) => {
          this.product.set(product);
          if (product.variants.length) {
            this.selectedVariantId.set(product.variants[0].id);
          }
        });
    });
  }

  addToCart(): void {
    const variant = this.selectedVariant();
    if (!variant) return;

    this.inFlight.set(true);
    this.dataService
      .mutate(ADD_TO_CART, {
        variantId: variant.id,
        qty: 1,
      })
      .subscribe({
        next: (result) => {
          console.log('result',result);
          
          if (result.addItemToOrder.__typename === 'Order') {
            this.stateService.setState('activeOrderId', result.addItemToOrder ? result.addItemToOrder.id : null);
            // Update cart quantities
            const newQtyInCart = { ...this.qtyInCart() };
            for (const line of result.addItemToOrder.lines) {
              newQtyInCart[line.productVariant.id] = line.quantity;
            }
            this.qtyInCart.set(newQtyInCart);
          }
          this.inFlight.set(false);
        },
        error: () => {
          this.inFlight.set(false);
        },
      });
  }

  private getMostRelevantCollection(
    collections: Collection[]
  ): Collection | null {
    if (!collections.length) return null;

    return collections.slice().sort((a, b) => {
      if (a.breadcrumbs.length < b.breadcrumbs.length) {
        return 1;
      }
      if (a.breadcrumbs.length > b.breadcrumbs.length) {
        return -1;
      }
      return 0;
    })[0];
  }
}
