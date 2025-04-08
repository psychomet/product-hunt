import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, GET_COLLECTIONS } from '@bigi-shop/shared-data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionCardComponent } from '@bigi-shop/shared-ui';
import { GetCollectionsQuery } from '@bigi-shop/shared-util-types';


@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, CollectionCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ng-container *ngIf="collections$ | async as collections">
          <bigi-collection-card
            *ngFor="let collection of collections"
            [collection]="collection"
          />
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
  private dataService = inject(DataService);
  collections$: Observable<GetCollectionsQuery['collections']['items'] | any>;

  ngOnInit(): void {
    this.collections$ = this.dataService
      .query(GET_COLLECTIONS, {
        options: { take: 50 },
      })
      .pipe(map(({ collections }) => collections.items));
  }
}
