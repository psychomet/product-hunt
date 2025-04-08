import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ActiveService,
  DataService,
  StateService,
} from '@bigi-shop/shared-data-access';
import { GET_PRODUCT_DETAIL, ADD_TO_CART } from './product-detail.graphql';
import {
  AddToCartMutation,
  AddToCartMutationVariables,
  GetProductDetailQuery,
  GetProductDetailQueryVariables,
  notNullOrUndefined,
} from '@bigi-shop/shared-util-types';
import { filter, map, Subscription, switchMap, withLatestFrom } from 'rxjs';
import {
  AssetGalleryComponent,
  CollectionBreadcrumbsComponent,
  FormatPricePipe,
  NotificationService,
  SafeHtmlPipe,
} from '@bigi-shop/shared-ui';
type Variant = NonNullable<
  GetProductDetailQuery['product']
>['variants'][number];
type Collection = NonNullable<
  GetProductDetailQuery['product']
>['collections'][number];

@Component({
  selector: 'lib-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AssetGalleryComponent,
    CollectionBreadcrumbsComponent,
    SafeHtmlPipe,
    FormatPricePipe,
  ],
  template: `
    <div class="max-w-6xl mx-auto px-4">
      <h2
        *ngIf="product; else titlePlaceholder"
        class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8"
      >
        {{ product?.name ?? '  ' }}
      </h2>
      <ng-template #titlePlaceholder>
        <div class="h-8 w-72 bg-gray-200 animate-pulse my-8">
          {{ product?.name ?? '  ' }}
        </div>
      </ng-template>
      <bigi-collection-breadcrumbs
        [breadcrumbs]="breadcrumbs"
        class="mb-2"
        [linkLast]="true"
      />
      <div
        class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12"
      >
        <bigi-asset-gallery
          [assets]="product?.assets"
          [selectedAssetId]="product?.featuredAsset?.id"
        />
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0" #zoomPreviewArea>
          <div class="">
            <h3 class="sr-only">Description</h3>

            <div
              class="text-base text-gray-700"
              [innerHTML]="product?.description | safeHtml"
            ></div>
          </div>
          <div class="mt-4" *ngIf="product?.variants.length > 1">
            <label
              htmlFor="option"
              class="block text-sm font-medium text-gray-700"
            >
              Select option
            </label>
            <select
              [(ngModel)]="selectedVariant"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option
                *ngFor="let variant of product?.variants"
                [ngValue]="variant"
              >
                {{ variant.name }}
              </option>
            </select>
          </div>

          <div class="mt-10 flex flex-col sm:flex-row sm:items-center">
            <p class="text-3xl text-gray-900 mr-4">
              {{ selectedVariant?.priceWithTax | formatPrice }}
            </p>
            <div class="flex sm:flex-col1 align-baseline">
              <button
                type="submit"
                class="max-w-xs flex-1 transition-colors border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full"
                [ngClass]="{
                  'bg-gray-400': inFlight,
                  'bg-primary-600 hover:bg-primary-700': !inFlight
                }"
                (click)="addToCart(selectedVariant, qty)"
              >
                <div
                  *ngIf="
                    !product || !qtyInCart[selectedVariant.id];
                    else inCartCount
                  "
                >
                  Add to cart
                </div>
                <ng-template #inCartCount>
                  <span>{{ qtyInCart[selectedVariant.id] }} in cart</span>
                </ng-template>
              </button>
            </div>
          </div>
          <div class="mt-2 flex items-center space-x-2">
            <span class="text-gray-500">
              {{ selectedVariant?.sku }}
            </span>
          </div>
          <section class="mt-12 pt-12 border-t text-xs">
            <h3 class="text-gray-600 font-bold mb-2">Shipping & Returns</h3>
            <div class="text-gray-500 space-y-1">
              <p>
                Standard shipping: 3 - 5 working days. Express shipping: 1 - 3
                working days.
              </p>
              <p>
                Shipping costs depend on delivery address and will be calculated
                during checkout.
              </p>
              <p>
                Returns are subject to terms. Please see the
                <span class="underline">returns page</span>
                for further information.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>

    <ng-template
      #addedToCartTemplate
      let-variant="variant"
      let-quantity="quantity"
      let-close="closeFn"
    >
      <div class="flex">
        <div class="mr-8">
          <img
            class="rounded"
            [src]="
              (variant.featuredAsset?.preview ||
                product?.featuredAsset?.preview) + '?preset=tiny'
            "
            alt="product thumbnail"
          />
        </div>
        <div class="text-sm">{{ quantity }} x {{ variant.name }}</div>
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          (click)="viewCartFromNotification(close)"
          class="inline-flex items-center rounded border border-transparent bg-primary-100 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          View cart
        </button>
      </div>
    </ng-template>
  `,
  styles: [
    ``,
  ],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: GetProductDetailQuery['product'];
  selectedAsset: { id: string; preview: string };
  qtyInCart: { [id: string]: number } = {};
  selectedVariant: Variant;
  qty = 1;
  breadcrumbs: Collection['breadcrumbs'] | null = null;
  inFlight = false;
  @ViewChild('addedToCartTemplate', { static: true })
  private addToCartTemplate: TemplateRef<any>;
  private sub: Subscription;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private notificationService: NotificationService,
    private activeService: ActiveService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const lastCollectionSlug$ = this.stateService.select(
      (state) => state.lastCollectionSlug
    );
    const productSlug$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('slug')),
      filter(notNullOrUndefined)
    );

    this.sub = productSlug$
      .pipe(
        switchMap((slug) => {
          return this.dataService.query<
            GetProductDetailQuery,
            GetProductDetailQueryVariables
          >(GET_PRODUCT_DETAIL, {
            slug,
          });
        }),
        map((data) => data.product),
        filter(notNullOrUndefined),
        withLatestFrom(lastCollectionSlug$)
      )
      .subscribe(([product, lastCollectionSlug]) => {
        this.product = product;
        if (this.product.featuredAsset) {
          this.selectedAsset = this.product.featuredAsset;
        }
        this.selectedVariant = product.variants[0];
        const collection = this.getMostRelevantCollection(
          product.collections,
          lastCollectionSlug
        );
        this.breadcrumbs = collection ? collection.breadcrumbs : [];
      });

    this.activeService.activeOrder$.subscribe((order) => {
      this.qtyInCart = {};
      for (const line of order?.lines ?? []) {
        this.qtyInCart[line.productVariant.id] = line.quantity;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  addToCart(variant: Variant, qty: number) {
    this.inFlight = true;
    this.dataService
      .mutate<AddToCartMutation, AddToCartMutationVariables>(ADD_TO_CART, {
        variantId: variant.id,
        qty,
      })
      .subscribe(({ addItemToOrder }) => {
        this.inFlight = false;
        switch (addItemToOrder.__typename) {
          case 'Order':
            this.stateService.setState(
              'activeOrderId',
              addItemToOrder ? addItemToOrder.id : null
            );
            if (variant) {
              this.notificationService
                .notify({
                  title: 'Added to cart',
                  type: 'info',
                  duration: 3000,
                  templateRef: this.addToCartTemplate,
                  templateContext: {
                    variant,
                    quantity: qty,
                  },
                })
                .subscribe();
            }
            break;
          case 'OrderModificationError':
          case 'OrderLimitError':
          case 'NegativeQuantityError':
          case 'InsufficientStockError':
            this.notificationService.error(addItemToOrder.message).subscribe();
            break;
        }
      });
  }

  viewCartFromNotification(closeFn: () => void) {
    this.stateService.setState('cartDrawerOpen', true);
    closeFn();
  }

  /**
   * If there is a collection matching the `lastCollectionId`, return that. Otherwise return the collection
   * with the longest `breadcrumbs` array, which corresponds to the most specific collection.
   */
  private getMostRelevantCollection(
    collections: Collection[],
    lastCollectionSlug: string | null
  ) {
    const lastCollection = collections.find(
      (c) => c.slug === lastCollectionSlug
    );
    if (lastCollection) {
      return lastCollection;
    }
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
