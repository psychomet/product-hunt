import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService, StateService } from '@bigi-shop/shared-data-access';
import { CollectionsMenuComponent, Collection, arrayToTree, TreeNode } from '@bigi-shop/shared-ui';
import { GET_COLLECTIONS, SIGN_OUT } from './shell-layout.graphql';
import { Observable, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'lib-shell-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, CollectionsMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="text-2xl font-bold text-gray-800">BigiShop</a>
            <bigi-collections-menu [collections]="collections$ | async"></bigi-collections-menu>
          </div>
          
          <div class="flex items-center space-x-4">
            <ng-container *ngIf="state.currentUser$ | async as user; else loginButton">
              <span class="text-gray-600">{{ user.identifier }}</span>
              <button
                (click)="signOut()"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </ng-container>
            
            <ng-template #loginButton>
              <a
                routerLink="/sign-in"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </a>
            </ng-template>

            <button
              (click)="state.toggleCartDrawer()"
              class="relative p-2 text-gray-600 hover:text-gray-900"
              [class.text-primary-600]="state.activeOrderId$ | async"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-gray-50 mt-auto">
      <div class="container mx-auto px-4 py-8">
        <p class="text-center text-gray-500">
          © {{ currentYear }} BigiShop. All rights reserved.
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col min-h-screen;
      }
    `,
  ],
})
export class ShellLayoutComponent {
  currentYear = new Date().getFullYear();

  private dataService = inject(DataService);
  private router = inject(Router);
  public state = inject(StateService);

  collections$: Observable<TreeNode<Collection>[]> = this.dataService
    .query<{ collections: { items: Collection[] } }>(GET_COLLECTIONS)
    .pipe(
      map(({ collections }) => {
        const tree = arrayToTree(collections.items);
        return tree;
      }),
      startWith([])
    );

  signOut() {
    this.dataService.mutate(SIGN_OUT).subscribe(() => {
      this.state.setCurrentUser(null);
      this.dataService.resetStore();
      this.router.navigate(['/']);
    });
  }
} 