import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';

import { from,merge, timer, zip } from 'rxjs';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

import {
  DataService,
  GET_CART_TOTALS,
  StateService,
} from '@product-hunt/shared-data-access';
import { GetCartTotalsQuery } from '@product-hunt/shared-util-types';

@Component({
  selector: 'bigi-cart-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="relative p-2 text-gray-600 hover:text-gray-900"
      [class.text-primary-600]="cartChangeIndication$ | async"
      (click)="cartToggle.emit()"
    >
      <span class="sr-only">Open cart</span>
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
      <span
        *ngIf="cart$ | async as cart"
        class="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary-600 text-xs font-medium flex items-center justify-center"
      >
        {{ cart.quantity }}
      </span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartToggleComponent {
  cartToggle = output<void>();
  private dataService = inject(DataService);
  private stateService = inject(StateService);

  cart$ = merge(
    this.stateService.select((state) => state.activeOrderId),
    this.stateService.select((state) => state.signedIn)
  ).pipe(
    switchMap(() =>
      this.dataService.query<GetCartTotalsQuery>(
        GET_CART_TOTALS,
        {},
        'network-only'
      )
    ),
    map(({ activeOrder }) => {
      return {
        total: activeOrder ? activeOrder.totalWithTax : 0,
        quantity: activeOrder ? activeOrder.totalQuantity : 0,
      };
    }),
    shareReplay(1)
  );

  cartChangeIndication$: Observable<boolean> = this.cart$.pipe(
    map((cart) => cart.quantity),
    distinctUntilChanged(),
    switchMap(() => zip(from([true, false]), timer(0, 1000)).pipe(map(([value]) => value)))
  );
}
