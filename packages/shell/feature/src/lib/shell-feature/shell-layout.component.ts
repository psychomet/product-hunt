import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import {
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs';

import {
  ActiveService,
  DataService,
  GET_COLLECTIONS,
  StateService,
} from '@product-hunt/shared-data-access';
import {
  arrayToTree,
  Collection,
  CollectionsMenuComponent,
  TreeNode,
} from '@product-hunt/shared-ui';
import type {
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
} from '@product-hunt/shared-util-types';
import { CartDrawerComponent } from '@product-hunt/shell-ui';

import { AccountLinkComponent } from '../account-link/account-link.component';
import { CartToggleComponent } from '../cart-toggle-feature/cart-toggle.component';

import {
  ADJUST_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
  SIGN_OUT,
} from './shell-layout.graphql';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    CollectionsMenuComponent,
    CartDrawerComponent,
    CartToggleComponent,
    AccountLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="text-2xl font-bold text-gray-800"
              >BigiShop</a
            >
            <bigi-collections-menu
              [collections]="collections$ | async"
            ></bigi-collections-menu>
          </div>

          <div class="flex items-center space-x-4">
            <bigi-account-link />

            <bigi-cart-toggle (cartToggle)="openCartDrawer()" />
          </div>
        </div>
      </div>
    </header>

    <!-- Cart Drawer -->
    <bigi-cart-drawer
      [visible]="cartDrawerVisible$ | async"
      [cart]="cart$ | async"
      (drawerClose)="closeCartDrawer()"
      (setQuantity)="setQuantity($event)"
    />

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
  private stateService = inject(StateService);
  private activeService = inject(ActiveService);

  cartDrawerVisible$ = this.stateService.select(
    (state) => state.cartDrawerOpen
  );
  activeOrderId$ = this.stateService.select((state) => state.activeOrderId);
  currentUser$ = this.stateService.select((state) => state.currentUser);

  cart$ = merge(
    this.stateService.select((state) => state.activeOrderId),
    this.stateService.select((state) => state.signedIn)
  ).pipe(
    switchMap(() => this.activeService.activeOrder$),
    shareReplay(1)
  );

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
      this.dataService.resetStore();
      this.router.navigate(['/']);
    });
  }

  openCartDrawer() {
    this.stateService.setState('cartDrawerOpen', true);
  }

  closeCartDrawer() {
    this.stateService.setState('cartDrawerOpen', false);
  }

  setQuantity(event: { itemId: string; quantity: number }) {
    if (0 < event.quantity) {
      this.adjustItemQuantity(event.itemId, event.quantity);
    } else {
      this.removeItem(event.itemId);
    }
  }

  adjustItemQuantity(id: string, qty: number) {
    this.dataService
      .mutate(ADJUST_ITEM_QUANTITY, {
        id,
        qty,
      })
      .pipe(take(1))
      .subscribe(({ adjustOrderLine }: any) => {
        if (adjustOrderLine.__typename !== 'Order') {
          // Handle error case
          console.error('Error adjusting quantity:', adjustOrderLine.message);
        }
      });
  }

  private removeItem(id: string) {
    this.dataService
      .mutate<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>(
        REMOVE_ITEM_FROM_CART,
        {
          id,
        }
      )
      .pipe(take(1))
      .subscribe();
  }
}
