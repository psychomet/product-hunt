import { Component, input, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '@bigi-shop/shared-data-access';
import { SEARCH_PRODUCTS, GET_COLLECTION } from './product-list.graphql';
import { SearchProductsQuery } from '@bigi-shop/shared-util-types';

export interface FacetWithValues {
  id: string;
  name: string;
  values: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

interface SearchFacetValue {
  count: number;
  facetValue: {
    id: string;
    name: string;
    facet: {
      id: string;
      name: string;
    };
  };
}

interface SearchItem {
  productId: string;
  slug: string;
  productName: string;
  description: string;
  priceWithTax: {
    min: number;
    max: number;
  };
  productAsset?: {
    id: string;
    preview: string;
    focalPoint?: {
      x: number;
      y: number;
    };
  };
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  featuredAsset?: {
    id: string;
    preview: string;
  };
  breadcrumbs: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface SearchResponse {
  search: {
    items: SearchItem[];
    totalItems: number;
    facetValues: SearchFacetValue[];
  };
}

interface CollectionResponse {
  collection: Collection;
}

@Component({
  selector: 'lib-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <!-- Collection Header -->
      <div *ngIf="collection()" class="mb-8">
        <div
          *ngIf="collection()?.featuredAsset"
          class="h-40 bg-cover bg-center rounded-lg mb-4"
          [style.background-image]="mastheadBackground()"
        ></div>
        <h1 class="text-3xl font-bold text-gray-900">
          {{ collection()?.name }}
        </h1>
        <p *ngIf="collection()?.description" class="mt-2 text-gray-500">
          {{ collection()?.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Facets -->
        <div class="lg:col-span-1" *ngIf="groupFacetValuesComputed()?.length">
          <div class="space-y-6">
            <div *ngFor="let facet of groupFacetValuesComputed()">
              <h3 class="text-lg font-medium text-gray-900">
                {{ facet.name }}
              </h3>
              <ng-container *ngFor="let facetValue of facet.values">
                <div class="mt-2 space-y-2">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      [checked]="isActiveFacetValue(facetValue.id)"
                      (change)="toggleFacetValue(facetValue.id)"
                    />
                    <span class="ml-2 text-gray-700">
                      {{ facetValue.name }} ({{ facetValue.count }})
                    </span>
                  </label>
                </div>
              </ng-container>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="lg:col-span-3">
          <div class="flex justify-between items-center mb-6">
            <div class="text-sm text-gray-500">
              {{ totalResults() }} products
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ng-container *ngIf="!loading(); else loadingTpl">
              <a
                *ngFor="let product of products(); trackBy: trackByProductId"
                [routerLink]="['/product', product.slug]"
                class="group"
              >
                <div
                  class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    *ngIf="product?.productAsset?.preview"
                    [src]="product.productAsset.preview"
                    [alt]="product.productName"
                    class="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div class="mt-4 space-y-2">
                  <h3 class="text-sm font-medium text-gray-900">
                    {{ product.productName }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ product.description }}</p>
                  <p class="text-lg font-medium text-gray-900">
                    {{ product.priceWithTax.min | currency }}
                    <span
                      *ngIf="
                        product.priceWithTax.max !== product.priceWithTax.min
                      "
                    >
                      - {{ product.priceWithTax.max | currency }}
                    </span>
                  </p>
                </div>
              </a>
            </ng-container>
          </div>

          <!-- Load More -->
          <div *ngIf="displayLoadMore()" class="mt-8 text-center">
            <button
              (click)="loadMore()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              [disabled]="loading()"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>

    <ng-template #loadingTpl>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let _ of placeholderProducts" class="animate-pulse">
          <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-200"></div>
          <div class="mt-4 space-y-4">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class ProductListComponent {
  readonly slug = input<string | null>();
  readonly facets = input<string>();
  readonly search = input<string>();

  private currentPage = signal(0);
  private activeFacetIds = computed(() =>
    this.facets() ? this.facets().split(',') : []
  );

  products = signal<SearchItem[]>([]);
  totalResults = signal(0);
  collection = signal<Collection | null>(null);
  facetValues = signal<SearchFacetValue[]>([]);
  loading = signal(false);

  groupFacetValuesComputed = computed(() =>
    this.groupFacetValues(this.facetValues())
  );
  displayLoadMore = computed(() => {
    return (
      this.products().length > 0 && this.products().length < this.totalResults()
    );
  });

  breadcrumbs = computed(() => {
    const collection = this.collection();
    if (collection) {
      return collection.breadcrumbs;
    }
    return [
      {
        id: '',
        name: 'Home',
        slug: '',
      },
      {
        id: '',
        name: 'Search',
        slug: '',
      },
    ];
  });

  mastheadBackground = computed(() => {
    const collection = this.collection();
    return collection?.featuredAsset
      ? `url(${collection.featuredAsset.preview})`
      : '';
  });

  readonly placeholderProducts = Array.from({ length: 12 }).map(
    (): null => null
  );

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    // Effect for fetching collection and initial facets
    effect(() => {
      const currentSlug = this.slug();
      if (currentSlug) {
        this.loading.set(true);
        this.dataService
          .query<CollectionResponse>(GET_COLLECTION, { slug: currentSlug })
          .subscribe((data) => {
            this.collection.set(data.collection);
            this.loading.set(false);
            // Fetch initial facet values if no facets are selected
            if (!this.facets()) {
              this.fetchFacetValues();
            } else {
              this.fetchProducts();
            }
          });
      } else {
        this.collection.set(null);
        if (!this.facets()) {
          this.fetchFacetValues();
        } else {
          this.fetchProducts();
        }
      }
    });

    // Effect for fetching products when inputs change
    effect(() => {
      if (this.slug() || this.facets() || this.search()) {
        this.currentPage.set(0);
        this.fetchProducts();
      }
    });

  }

  private fetchFacetValues(): void {
    this.loading.set(true);
    this.dataService
      .query<SearchResponse>(SEARCH_PRODUCTS, {
        input: {
          term: this.search() || '',
          groupByProduct: true,
          collectionId: this.collection()?.id,
          take: 0, // We only need facets, not products
        },
      })
      .subscribe((data) => {
        this.facetValues.set(data.search.facetValues);
        this.fetchProducts();
      });
  }

  private fetchProducts(): void {
    const perPage = 24;
    this.loading.set(true);

    this.dataService
      .query<SearchResponse>(SEARCH_PRODUCTS, {
        input: {
          term: this.search() || '',
          groupByProduct: true,
          collectionId: this.collection()?.id,
          facetValueFilters: this.activeFacetIds().map((id) => ({ and: id })),
          take: perPage,
          skip: this.currentPage() * perPage,
        },
      })
      .subscribe((data) => {
        // Always update facet values to get accurate counts
        this.facetValues.set(data.search.facetValues);
        this.products.set(
          this.currentPage() === 0
            ? data.search.items
            : [...this.products(), ...data.search.items]
        );
        this.totalResults.set(data.search.totalItems);
        this.loading.set(false);
      });
  }

  trackByProductId(_: number, item: SearchItem): string {
    return item.productId;
  }

  loadMore(): void {
    this.currentPage.update((page) => page + 1);
    this.fetchProducts();
  }

  isActiveFacetValue(id: string): boolean {
    return this.activeFacetIds().includes(id);
  }

  toggleFacetValue(id: string): void {
    const currentIds = this.activeFacetIds();
    const newIds = currentIds.includes(id)
      ? currentIds.filter((x) => x !== id)
      : [...currentIds, id];

    this.router.navigate([], {
      queryParams: { facets: newIds.length ? newIds.join(',') : null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private groupFacetValues(
    facetValues: SearchProductsQuery['search']['facetValues'] | null
  ): FacetWithValues[] {
    if (!facetValues) {
      return [];
    }
    const activeFacetValueIds = this.activeFacetIds();
    const facetMap = new Map<string, FacetWithValues>();
    for (const {
      count,
      facetValue: { id, name, facet },
    } of facetValues) {
      if (count === this.totalResults() && !activeFacetValueIds.includes(id)) {
        // skip FacetValues that do not have any effect on the
        // result set and are not active
        continue;
      }
      const facetFromMap = facetMap.get(facet.id);
      if (facetFromMap) {
        facetFromMap.values.push({ id, name, count });
      } else {
        facetMap.set(facet.id, {
          id: facet.id,
          name: facet.name,
          values: [{ id, name, count }],
        });
      }
    }
    return Array.from(facetMap.values());
  }
}
