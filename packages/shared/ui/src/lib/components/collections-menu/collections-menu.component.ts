import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TreeNode } from './array-to-tree';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  parent: {
    id: string;
    name: string;
  } | null;
}

@Component({
  selector: 'bigi-collections-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="collections-menu" *ngIf="collections?.length">
      <ul class="menu-list">
        <ng-container *ngTemplateOutlet="menuItems; context: { $implicit: collections }">
        </ng-container>
      </ul>
    </nav>

    <ng-template #menuItems let-items>
      <li *ngFor="let item of items" class="menu-item">
        <a [routerLink]="['/category', item.data.slug]" class="menu-link">
          {{ item.data.name }}
        </a>
        <ul *ngIf="item.children?.length" class="submenu">
          <ng-container *ngTemplateOutlet="menuItems; context: { $implicit: item.children }">
          </ng-container>
        </ul>
      </li>
    </ng-template>
  `,
  styles: [`
    .collections-menu {
      @apply relative;
    }

    .menu-list {
      @apply flex gap-4;
    }

    .menu-item {
      @apply relative;

      &:hover {
        > .submenu {
          @apply block;
        }
      }
    }

    .menu-link {
      @apply text-gray-600 hover:text-gray-900 font-medium;
    }

    .submenu {
      @apply hidden absolute left-0 top-full min-w-[200px] bg-white shadow-lg rounded-md py-2 z-50;

      .menu-list {
        @apply flex-col gap-0;
      }

      .menu-item {
        @apply relative;

        .submenu {
          @apply left-full top-0;
        }
      }

      .menu-link {
        @apply block px-4 py-2 hover:bg-gray-50 text-sm;
      }
    }
  `]
})
export class CollectionsMenuComponent {
  @Input() collections: TreeNode<Collection>[] | null = [];
} 