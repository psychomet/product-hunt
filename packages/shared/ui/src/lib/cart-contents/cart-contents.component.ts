import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CartFragment,
  GetActiveOrderQuery,
} from '@bigi-shop/shared-util-types';
import { RouterLink } from '@angular/router';
import { FormatPricePipe } from '../format-price.pipe';
import { AssetPreviewPipe } from '../asset-preview.pipe';

@Component({
  selector: 'bigi-cart-contents',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatPricePipe, AssetPreviewPipe],
  template: `
    <div *ngIf="cart" class="flow-root">
      <ul role="list" class="divide-y divide-gray-200">
        <ng-container *ngFor="let line of cart()?.lines; trackBy: trackByFn">
          <li class="py-6 flex">
            <div
              class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
            >
              <img
                [src]="line.featuredAsset | assetPreview : 'thumb'"
                [alt]="line.productVariant.name"
                class="rounded"
              />
            </div>

            <div class="ml-4 flex-1 flex flex-col">
              <div>
                <div
                  class="flex justify-between text-base font-medium text-gray-900"
                >
                  <h3>
                    <a [routerLink]="['/products', line.productVariant]">
                      {{ line.productVariant.name }}
                    </a>
                  </h3>
                  <p class="ml-4">
                    {{ line.linePriceWithTax | formatPrice }}
                  </p>
                </div>
              </div>
              <div
                class="flex-1 flex items-center justify-between text-sm text-gray-600"
              >
                <div class="flex space-x-4">
                  <button
                    class="btn btn-sm"
                    *ngIf="canAdjustQuantities()"
                    (click)="decrement(line)"
                  >
                    Remove
                  </button>
                  <div class="qty">{{ line.quantity }}</div>
                  <button
                    class="btn btn-sm"
                    *ngIf="canAdjustQuantities()"
                    (click)="increment(line)"
                  >
                    Add
                  </button>
                </div>
                <div class="total">
                  <div class="">
                    {{ line.unitPriceWithTax | formatPrice }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ng-container>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContentsComponent {
  cart = input<GetActiveOrderQuery['activeOrder'] | null>();
  canAdjustQuantities = input<boolean>();
  @Output() setQuantity = new EventEmitter<{
    itemId: string;
    quantity: number;
  }>();

  constructor() {
    effect(() => {
      console.log(this.cart());
    });
  }

  increment(item: CartFragment['lines'][number]) {
    this.setQuantity.emit({ itemId: item.id, quantity: item.quantity + 1 });
  }

  decrement(item: CartFragment['lines'][number]) {
    this.setQuantity.emit({ itemId: item.id, quantity: item.quantity - 1 });
  }

  trackByFn(index: number, line: { id: string }) {
    return line.id;
  }

  trackByDiscount(index: number, discount: CartFragment['discounts'][number]) {
    return discount.adjustmentSource;
  }

  isDiscounted(line: CartFragment['lines'][number]): boolean {
    return line.discountedLinePriceWithTax < line.linePriceWithTax;
  }

  /**
   * Filters out the Promotion adjustments for an OrderLine and aggregates the discount.
   */
  getLinePromotions(adjustments: CartFragment['discounts']) {
    const groupedPromotions = adjustments
      .filter((a) => a.type === 'PROMOTION')
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
      amount: value,
    }));
  }
}
