import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, GET_COLLECTIONS } from '@bigi-shop/shared-data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Collection {
  id: string;
  name: string;
  slug: string;
  parent?: {
    id: string;
    slug: string;
    name: string;
  };
  featuredAsset?: {
    id: string;
    preview: string;
  };
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: {
    preview: string;
  } | null;
  variants: Array<{
    id: string;
    name: string;
    price: number;
    priceWithTax: number;
  }>;
}

interface CollectionsResponse {
  collections: {
    items: Collection[];
  };
}

interface SearchResponse {
  search: {
    items: Product[];
  };
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ng-container *ngIf="collections$ | async as collections">
          <a
            *ngFor="let collection of collections"
            [routerLink]="['/category', collection.slug]"
            class="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="aspect-w-3 aspect-h-2">
              <img
                *ngIf="collection.featuredAsset?.preview"
                [src]="collection.featuredAsset.preview"
                [alt]="collection.name"
                class="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-900">{{ collection.name }}</h3>
            </div>
          </a>
        </ng-container>
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
export class HomeComponent implements OnInit {
  collections$: Observable<Collection[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.collections$ = this.dataService
      .query(GET_COLLECTIONS, {
        options: { take: 50 },
      })
      .pipe(map(({ collections }) => collections.items));
  }
}
