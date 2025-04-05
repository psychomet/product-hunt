import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartLine {
  id: string;
  quantity: number;
  linePriceWithTax: number;
  discountedLinePriceWithTax: number;
  productVariant: {
    id: string;
    name: string;
    sku: string;
    price: number;
    priceWithTax: number;
    featuredAsset?: {
      preview: string;
    };
  };
}

interface CartDiscount {
  type: string;
  description: string;
  amount: number;
  adjustmentSource: string;
}

interface Cart {
  id: string;
  lines: CartLine[];
  discounts: CartDiscount[];
  totalQuantity: number;
  subTotal: number;
  subTotalWithTax: number;
  total: number;
  totalWithTax: number;
}

@Component({
  selector: 'bigi-cart-contents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flow-root">
      <ul role="list" class="-my-6 divide-y divide-gray-200">
        <li *ngFor="let line of cart()?.lines; trackBy: trackByFn" class="flex py-6">
          <!-- Product Image -->
          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              [src]="line.productVariant.featuredAsset?.preview"
              [alt]="line.productVariant.name"
              class="h-full w-full object-cover object-center"
            >
          </div>

          <!-- Product Details -->
          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>{{ line.productVariant.name }}</h3>
                <p class="ml-4">
                  <span [class.line-through]="isDiscounted(line)" class="text-sm">
                    {{ line.linePriceWithTax | currency }}
                  </span>
                  <span *ngIf="isDiscounted(line)" class="ml-1 text-sm font-medium text-red-600">
                    {{ line.discountedLinePriceWithTax | currency }}
                  </span>
                </p>
              </div>
              <p class="mt-1 text-sm text-gray-500">SKU: {{ line.productVariant.sku }}</p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex flex-1 items-end justify-between text-sm">
              <div class="flex items-center" *ngIf="canAdjustQuantities()">
                <button
                  type="button"
                  (click)="decrement(line)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <span class="sr-only">Decrease quantity</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
                <span class="mx-2 text-gray-700">{{ line.quantity }}</span>
                <button
                  type="button"
                  (click)="increment(line)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <span class="sr-only">Increase quantity</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div class="flex" *ngIf="!canAdjustQuantities()">
                <p class="text-gray-500">Qty {{ line.quantity }}</p>
              </div>
            </div>

            <!-- Promotions -->
            <div *ngIf="getLinePromotions(cart()?.discounts || []).length" class="mt-2">
              <ul class="text-sm text-red-600">
                <li *ngFor="let promotion of getLinePromotions(cart()?.discounts || []); trackBy: trackByDiscount">
                  {{ promotion.description }}: -{{ promotion.amount | currency }}
                </li>
              </ul>
            </div>
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
  canAdjustQuantities = input<boolean>(false);
  setQuantity = output<{ itemId: string; quantity: number }>();

  increment(item: CartLine) {
    this.setQuantity.emit({ itemId: item.id, quantity: item.quantity + 1 });
  }

  decrement(item: CartLine) {
    this.setQuantity.emit({ itemId: item.id, quantity: item.quantity - 1 });
  }

  trackByFn(_: number, line: { id: string }) {
    return line.id;
  }

  trackByDiscount(_: number, discount: CartDiscount) {
    return discount.adjustmentSource;
  }

  isDiscounted(line: CartLine): boolean {
    return line.discountedLinePriceWithTax < line.linePriceWithTax;
  }

  getLinePromotions(adjustments: CartDiscount[]) {
    const groupedPromotions = adjustments
      .filter(a => a.type === 'PROMOTION')
      .reduce((groups, promotion) => {
        if (!groups[promotion.description]) {
          groups[promotion.description] = promotion.amount;
        } else {
          groups[promotion.description] += promotion.amount;
        }
        return groups;
      }, {} as { [description: string]: number });

    return Object.entries(groupedPromotions).map(([key, value]) => ({
      description: key,
      amount: value
    }));
  }
} 