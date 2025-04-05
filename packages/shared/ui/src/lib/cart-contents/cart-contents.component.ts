import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-cart-contents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul role="list" class="divide-y divide-gray-200">
      <li *ngFor="let line of cart()?.lines; trackBy: trackByFn" class="flex py-6">
        <!-- Product Image -->
        <div
          class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
        >
          <img
            [src]="line.productVariant.featuredAsset?.preview"
            [alt]="line.productVariant.name"
            class="h-full w-full object-cover object-center"
          />
        </div>

        <!-- Product Details -->
        <div class="ml-4 flex flex-1 flex-col">
          <div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <h3>{{ line.productVariant.name }}</h3>
              <p class="ml-4">{{ line.linePriceWithTax | currency }}</p>
            </div>
            <p class="mt-1 text-sm text-gray-500">SKU: {{ line.productVariant.sku }}</p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex flex-1 items-end justify-between text-sm">
            <div class="flex items-center space-x-2">
              <button
                type="button"
                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                (click)="decrement(line)"
              >
                -
              </button>
              <span class="text-gray-500">Qty {{ line.quantity }}</span>
              <button
                type="button"
                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                (click)="increment(line)"
              >
                +
              </button>
            </div>

            <div class="flex">
              <button
                type="button"
                class="font-medium text-primary-600 hover:text-primary-500"
                (click)="setQuantity.emit({ itemId: line.id, quantity: 0 })"
              >
                Remove
              </button>
            </div>
          </div>

          <!-- Line Promotions -->
          <div *ngIf="isDiscounted(line)" class="mt-1">
            <span class="text-sm text-green-500">
              {{ line.discounts[0].description }}
            </span>
          </div>
        </div>
      </li>
    </ul>

    <!-- Cart Promotions -->
    <div *ngIf="getLinePromotions(cart()?.discounts || []).length" class="mt-2">
      <h4 class="sr-only">Promotions</h4>
      <ul role="list" class="divide-y divide-gray-200">
        <li *ngFor="let promotion of getLinePromotions(cart()?.discounts || []); trackBy: trackByDiscount">
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-green-500">{{ promotion.description }}</span>
            <span class="text-sm text-green-500">-{{ promotion.amount | currency }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Cart Summary -->
    <div class="border-t border-gray-200 px-4 py-6 sm:px-6" *ngIf="cart()">
      <div class="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>{{ cart()?.subTotalWithTax | currency }}</p>
      </div>
      <div class="flex justify-between text-base font-medium text-gray-900 mt-4">
        <p>Total</p>
        <p>{{ cart()?.totalWithTax | currency }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContentsComponent {
  cart = input<Cart | null>();
  setQuantity = output<{ itemId: string; quantity: number }>();

  increment(item: Cart['lines'][0]) {
    this.setQuantity.emit({ itemId: item.id, quantity: item.quantity + 1 });
  }

  decrement(item: Cart['lines'][0]) {
    if (item.quantity > 0) {
      this.setQuantity.emit({ itemId: item.id, quantity: item.quantity - 1 });
    }
  }

  trackByFn(index: number, item: Cart['lines'][0]) {
    return item.id;
  }

  trackByDiscount(index: number, item: Cart['discounts'][0]) {
    return item.description;
  }

  isDiscounted(line: Cart['lines'][0]): boolean {
    return line.discounts.length > 0;
  }

  getLinePromotions(adjustments: Cart['discounts']) {
    return adjustments.filter(a => a.type === 'PROMOTION');
  }
} 