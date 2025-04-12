import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, OnInit,signal } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';

import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  mapTo,
  merge,
  Observable,
  of,
  scan,
  share,
  shareReplay,
  skip,
  switchMap,
  take,
  tap
} from 'rxjs';

import { ProductListControlsComponent } from '@product-hunt/products-ui';
import { DataService, StateService } from '@product-hunt/shared-data-access';
import { AssetPreviewPipe, CollectionBreadcrumbsComponent, CollectionCardComponent, ProductCardComponent } from '@product-hunt/shared-ui';
import {
  GetCollectionQuery,
  GetCollectionQueryVariables,
  getRouteArrayParam,
  SearchProductsQuery,
  SearchProductsQueryVariables
} from '@product-hunt/shared-util-types';

import { GET_COLLECTION,SEARCH_PRODUCTS } from './product-list.graphql';

type SearchItem = SearchProductsQuery['search']['items'][number];

@Component({
  selector: 'lib-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, CollectionBreadcrumbsComponent, CollectionCardComponent, ProductListControlsComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4">
    <ng-container *ngIf="collection$ | async as collection">
        <div class="flex justify-between items-center">
            <h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
                {{collection.name}}
            </h2>
        </div>
      <ng-container *ngIf="breadcrumbs$ | async as breadcrumbs">
        <bigi-collection-breadcrumbs [breadcrumbs]="breadcrumbs"></bigi-collection-breadcrumbs>
      </ng-container>

        <ng-container *ngIf="collection.children?.length">
            <div class="max-w-2xl mx-auto py-16 sm:py-16 lg:max-w-none border-b mb-16">
                <h2 class="text-2xl font-light text-gray-900">
                    Collections
                </h2>
                <div class="mt-6 grid max-w-xs sm:max-w-none mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    <bigi-collection-card *ngFor="let child of collection.children"
                                         [collection]="child">
                    </bigi-collection-card>
                </div>
            </div>
        </ng-container>
    </ng-container>

    <h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8" *ngIf="searchTerm$ | async as term">
        Results for <span class="font-medium">"{{ term }}"</span>
    </h2>

    <div class="mt-6 grid sm:grid-cols-5 gap-x-4">
        <bigi-product-list-controls
            class="mb-4"
            [facetValues]="facetValues"
            [activeFacetValueIds]="(activeFacetValueIds$ | async) || []"
            [totalResults]="unfilteredTotalItems" />
        <div class="sm:col-span-5 lg:col-span-4">
            <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <ng-container *ngIf="(totalResults$ | async) !== null; else placeholders">
                    <bigi-product-card *ngFor="let product of products$ | async; trackBy: trackByProductId"
                                      [product]="product"></bigi-product-card>
                </ng-container>
                <ng-template #placeholders>
                    <bigi-product-card *ngFor="let product of placeholderProducts"
                                      [product]="product"></bigi-product-card>
                </ng-template>
            </div>
            <div class="load-more flex-fill" *ngIf="displayLoadMore$ | async">
                <button class="btn btn-light btn-lg d-inline-flex align-items-center"
                        (click)="loadMore()"
                        [disabled]="loading$ | async">
                    Load more
                    <span [class.show]="loading$ | async"
                          class="loading-indicator spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>

    <ng-template #noResults>
        <div class="no-results col-12">
            <p class="h1">No results</p>
        </div>
    </ng-template>
</div>
  `,
  styles: [
    `
    `,
  ],
})
export class ProductListComponent implements OnInit {
  products$: Observable<SearchItem[]>;
  totalResults$: Observable<number>;
  collection$: Observable<GetCollectionQuery['collection']>;
  facetValues: SearchProductsQuery['search']['facetValues'];
  unfilteredTotalItems = 0;
  activeFacetValueIds$: Observable<string[]>;
  searchTerm$: Observable<string>;
  displayLoadMore$: Observable<boolean>;
  loading$: Observable<boolean>;
  breadcrumbs$: Observable<Array<{id: string; name: string; slug: string }>>;
  mastheadBackground$: Observable<SafeStyle>;
  private currentPage = 0;
  private refresh = new BehaviorSubject<void>(undefined);
  readonly placeholderProducts = Array.from({ length: 12 }).map(() => null as any);

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private stateService: StateService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
      const perPage = 24;
      const collectionSlug$ = this.route.paramMap.pipe(
          map(pm => pm.get('slug')),
          distinctUntilChanged(),
          tap(slug => {
              this.stateService.setState('lastCollectionSlug', slug || null);
              this.currentPage = 0;
          }),
          shareReplay(1),
      );
      this.activeFacetValueIds$ = this.route.paramMap.pipe(
          map(pm => getRouteArrayParam(pm, 'facets')),
          distinctUntilChanged((x, y) => x.toString() === y.toString()),
          tap(() => {
              this.currentPage = 0;
          }),
          shareReplay(1),
      );
      this.searchTerm$ = this.route.queryParamMap.pipe(
          map(pm => pm.get('search') || ''),
          distinctUntilChanged(),
          shareReplay(1),
      );

      this.collection$ = collectionSlug$.pipe(
          switchMap(slug => {
              if (slug) {
                  return this.dataService.query<GetCollectionQuery, GetCollectionQueryVariables>(GET_COLLECTION, {
                      slug,
                  }).pipe(
                      map(data => data.collection),
                  );
              } else {
                  return of(undefined);
              }
          }),
          shareReplay(1),
      );

      const assetPreviewPipe = new AssetPreviewPipe();

      this.mastheadBackground$ = this.collection$.pipe(
          map(c => 'url(' + assetPreviewPipe.transform(c?.featuredAsset || undefined, 1000, 300) + ')'),
          map(style => this.sanitizer.bypassSecurityTrustStyle(style)),
      );

      this.breadcrumbs$ = this.collection$.pipe(
          map(collection => {
              if (collection) {
                  return collection.breadcrumbs;
              } else {
                  return [{
                      id: '',
                      name: 'Home',
                      slug: ''
                  }, {
                      id: '',
                      name: 'Search',
                      slug: ''
                  }];
              }
          }),
      );

      const triggerFetch$ = combineLatest(this.collection$, this.activeFacetValueIds$, this.searchTerm$, this.refresh);
      const getInitialFacetValueIds = () => {
          combineLatest(this.collection$, this.searchTerm$).pipe(
              take(1),
              switchMap(([collection, term]) => {
                  return this.dataService.query<SearchProductsQuery, SearchProductsQueryVariables>(SEARCH_PRODUCTS, {
                      input: {
                          term,
                          groupByProduct: true,
                          collectionId: collection?.id,
                          take: perPage,
                          skip: this.currentPage * perPage,
                      },
                  });
              }),
              ).subscribe(data => {
                  this.facetValues = data.search.facetValues;
                  this.unfilteredTotalItems = data.search.totalItems;
              });
      };
      this.loading$ = merge(
          triggerFetch$.pipe(mapTo(true)),
      );
      const queryResult$ = triggerFetch$.pipe(
          switchMap(([collection, facetValueIds, term]) => {
              return this.dataService.query<SearchProductsQuery, SearchProductsQueryVariables>(SEARCH_PRODUCTS, {
                  input: {
                      term,
                      groupByProduct: true,
                      collectionId: collection?.id,
                      facetValueFilters: facetValueIds.map(id => ({ and: id })),
                      take: perPage,
                      skip: this.currentPage * perPage,
                  },
              }).pipe(
                  tap(data => {
                      if (facetValueIds.length === 0) {
                          this.facetValues = data.search.facetValues;
                          this.unfilteredTotalItems = data.search.totalItems;
                      } else if (!this.facetValues) {
                          getInitialFacetValueIds();
                      } else {
                          this.facetValues = this.facetValues.map(fv => fv);
                      }
                  }),
              );
          }),
          shareReplay(1),
      );

      this.loading$ = merge(
          triggerFetch$.pipe(mapTo(true)),
          queryResult$.pipe(mapTo(false)),
      );

      const RESET = 'RESET';
      const items$ = this.products$ = queryResult$.pipe(map(data => data.search.items));
      const reset$ = merge(collectionSlug$, this.activeFacetValueIds$, this.searchTerm$).pipe(
          mapTo(RESET),
          skip(1),
          share(),
      );
      this.products$ = merge(items$, reset$).pipe(
          scan<SearchItem[] | string, SearchItem[]>((acc, val) => {
              if (typeof val === 'string') {
                  return [];
              } else {
                  return acc.concat(val);
              }
          }, [] as SearchItem[]),
      );
      this.totalResults$ = queryResult$.pipe(map(data => data.search.totalItems));
      this.displayLoadMore$ = combineLatest(this.products$, this.totalResults$).pipe(
          map(([products, totalResults]: any) => {
              return 0 < products.length && products.length < totalResults;
          }),
      );

  }

  trackByProductId(index: number, item: SearchItem) {
      return item.productId;
  }

  loadMore() {
      this.currentPage ++;
      this.refresh.next();
  }

}
