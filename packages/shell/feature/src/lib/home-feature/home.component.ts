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
