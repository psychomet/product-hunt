import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentsComponent } from '@bigi-shop/shared-ui';
import { RouterModule } from '@angular/router';

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

interface Cart {
  id: string;
  lines: CartLine[];
  discounts: Array<{
    type: string;
    description: string;
    amount: number;
    adjustmentSource: string;
  }>;
  totalQuantity: number;
  subTotal: number;
  subTotalWithTax: number;
  total: number;
  totalWithTax: number;
}

@Component({
  selector: 'bigi-cart-drawer',
  standalone: true,
  imports: [CommonModule, CartContentsComponent, RouterModule],
  template: `
    <div 
      *ngIf="visible()"
      class="relative z-50"
      aria-labelledby="slide-over-title" 
      role="dialog" 
      aria-modal="true"
    >
      <!-- Overlay -->
      <div 
        #overlay
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        (click)="overlayClick($event)"
      ></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <!-- Header -->
                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                    <div class="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        (click)="drawerClose.emit()"
                      >
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Close panel</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div *ngIf="isEmpty()" class="mt-8">
                    <div class="text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          vector-effect="non-scaling-stroke"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                      <p class="mt-1 text-sm text-gray-500">Start adding some items to your cart</p>
                    </div>
                  </div>

                  <!-- Cart Contents -->
                  <div *ngIf="!isEmpty()" class="mt-8">
                    <bigi-cart-contents
                      [cart]="cart()"
                      [canAdjustQuantities]="true"
                      (setQuantity)="setQuantity.emit($event)"
                    />
                  </div>
                </div>

                <!-- Footer -->
                <div class="border-t border-gray-200 px-4 py-6 sm:px-6" *ngIf="!isEmpty()">
                  <div class="mt-6">
                    <a
                      routerLink="/checkout"
                      (click)="drawerClose.emit()"
                      class="flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        class="font-medium text-primary-600 hover:text-primary-500"
                        (click)="drawerClose.emit()"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> →</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDrawerComponent {
  visible = input<boolean>(false);
  cart = input<Cart | null>();
  drawerClose = output<void>();
  setQuantity = output<{ itemId: string; quantity: number }>();

  overlay = viewChild<ElementRef>('overlay');

  isEmpty = signal(true);

  overlayClick(event: MouseEvent) {
    if (event.target === this.overlay()?.nativeElement) {
      this.drawerClose.emit();
    }
  }
} 