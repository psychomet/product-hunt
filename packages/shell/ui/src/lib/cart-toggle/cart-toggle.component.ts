import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '@bigi-shop/shared-util-types';
import { timer, of } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  switchMap,
  map,
  take,
} from 'rxjs/operators';

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
        *ngIf="cartQuantity()"
        class="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary-600 text-xs font-medium flex items-center justify-center"
      >
        {{ cartQuantity() }}
      </span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartToggleComponent {
  cart = input<Cart | null>();
  cartToggle = output<void>();

  private lastQuantity = signal<number>(0);
  
  cartQuantity = computed(() => this.cart()?.totalQuantity ?? 0);
  
  cartChangeIndication$ = toObservable(this.cartQuantity).pipe(
    switchMap((quantity) => {
      if (quantity !== this.lastQuantity()) {
        this.lastQuantity.set(quantity);
        return timer(0, 1000).pipe(
          take(2),
          map((i) => i === 0)
        );
      }
      return of(false);
    })
  );
}
