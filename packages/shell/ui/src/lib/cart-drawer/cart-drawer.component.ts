import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentsComponent } from '@bigi-shop/shared-ui';
import { RouterModule } from '@angular/router';
import { Cart, GetActiveOrderQuery } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-cart-drawer',
  standalone: true,
  imports: [CommonModule, CartContentsComponent, RouterModule],
  template: `
    <div
      class="fixed inset-0 overflow-hidden"
      [class.pointer-events-none]="!visible()"
    >
      <div class="absolute inset-0 overflow-hidden">
        <!-- Background overlay -->
        <div
          class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          [class.opacity-0]="!visible()"
          [class.opacity-100]="visible()"
          (click)="drawerClose.emit()"
        ></div>

        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            class="w-screen max-w-md transform transition ease-in-out duration-500"
            [class.translate-x-full]="!visible()"
            [class.translate-x-0]="visible()"
          >
            <div class="h-full flex flex-col bg-white shadow-xl">
              <!-- Header -->
              <div class="flex-1 h-0 overflow-y-auto">
                <div class="flex items-start justify-between p-4 sm:px-6">
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                  <div class="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      class="bg-white rounded-md text-gray-400 hover:text-gray-500"
                      (click)="drawerClose.emit()"
                    >
                      <span class="sr-only">Close panel</span>
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Empty State -->
                <div
                  *ngIf="isEmpty()"
                  class="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <div class="text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                    <p class="mt-1 text-sm text-gray-500">Start adding some items to your cart</p>
                  </div>
                </div>

                <!-- Cart Contents -->
                <div *ngIf="!isEmpty()">
                  <bigi-cart-contents
                    [cart]="cart()"
                    (setQuantity)="setQuantity.emit($event)"
                  />
                </div>
              </div>

              <!-- Footer -->
              <div class="border-t border-gray-200 p-4 sm:px-6">
                <div class="mt-6">
                  <a
                    routerLink="/checkout"
                    class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                    (click)="drawerClose.emit()"
                  >
                    Checkout
                  </a>
                </div>
                <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    <button
                      type="button"
                      class="text-primary-600 font-medium hover:text-primary-500"
                      (click)="drawerClose.emit()"
                    >
                      Continue Shopping<span aria-hidden="true"> →</span>
                    </button>
                  </p>
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
  visible = input<boolean>();
  cart = input<GetActiveOrderQuery['activeOrder'] | null>();
  drawerClose = output<void>();
  setQuantity = output<{ itemId: string; quantity: number }>();

  isEmpty = computed(() => this.cart()?.lines.length === 0);
} 