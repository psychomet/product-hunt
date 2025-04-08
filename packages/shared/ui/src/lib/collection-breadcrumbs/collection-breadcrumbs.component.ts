import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetCollectionQuery } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-collection-breadcrumbs',
  imports: [CommonModule, RouterLink],
  templateUrl: './collection-breadcrumbs.component.html',
  styleUrl: './collection-breadcrumbs.component.scss',
})
export class CollectionBreadcrumbsComponent {
  @Input() breadcrumbs?: NonNullable<
    GetCollectionQuery['collection']
  >['breadcrumbs'] = [];
  @Input() linkLast = false;

  tail<T>(arr: T[] | null): T[] {
    return arr ? arr.slice(1) : [];
  }
}
