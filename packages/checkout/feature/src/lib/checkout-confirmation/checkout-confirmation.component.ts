import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { CheckoutService } from '@bigi-shop/checkout-data-access';

@Component({
  selector: 'bigi-checkout-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <ng-container *ngIf="order$ | async as order">
        <!-- Order Confirmation Header -->
        <div class="text-center mb-12">
          <div class="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-3xl font-extrabold text-gray-900 mb-4">Thank you for your order!</h1>
          <p class="text-lg text-gray-600">Your order has been confirmed and will be shipping soon.</p>
        </div>

        <!-- Order Details -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="text-lg font-medium text-gray-900">Order Information</h2>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Order number</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ order.code }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Date placed</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ order.updatedAt | date:'medium' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Total amount</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ order.totalWithTax | currency }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Shipping method</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ order.shippingMethod?.name }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Create Account Section -->
        <div *ngIf="!order.customer?.user" class="bg-white shadow sm:rounded-lg mb-8">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900">Create an account</h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
              <p>Create an account to enjoy faster checkouts, order tracking, order history and more!</p>
            </div>
            <div class="mt-5">
              <button
                type="button"
                (click)="register(order)"
                [disabled]="registrationSent"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Create account
              </button>
            </div>
            <div *ngIf="registrationSent" class="mt-4 rounded-md bg-green-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800">
                    Great! Now check your email ({{ order.customer?.emailAddress }}) to complete registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="text-lg font-medium text-gray-900">Order Items</h2>
          </div>
          <div class="border-t border-gray-200">
            <ul role="list" class="divide-y divide-gray-200">
              <li *ngFor="let line of order.lines" class="p-4 sm:px-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                    <img
                      *ngIf="line.productVariant.featuredAsset"
                      [src]="line.productVariant.featuredAsset.preview"
                      [alt]="line.productVariant.name"
                      class="w-full h-full object-center object-cover"
                    >
                  </div>
                  <div class="ml-6 flex-1">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="text-sm font-medium text-gray-900">
                          {{ line.productVariant.name }}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Qty: {{ line.quantity }}</p>
                      </div>
                      <p class="ml-4 text-sm font-medium text-gray-900">
                        {{ line.linePriceWithTax | currency }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div class="flex justify-between text-sm font-medium">
              <p class="text-gray-900">Subtotal</p>
              <p class="text-gray-900">{{ order.total | currency }}</p>
            </div>
            <div class="flex justify-between text-sm font-medium mt-2">
              <p class="text-gray-900">Shipping</p>
              <p class="text-gray-900">{{ order.shippingMethod?.priceWithTax | currency }}</p>
            </div>
            <div class="flex justify-between text-base font-medium mt-8">
              <p class="text-gray-900">Total</p>
              <p class="text-gray-900">{{ order.totalWithTax | currency }}</p>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- Not Found Message -->
      <div *ngIf="notFound$ | async" class="text-center">
        <h2 class="text-2xl font-bold text-gray-900">Order not found</h2>
        <p class="mt-2 text-sm text-gray-500">The order you're looking for could not be found.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutConfirmationComponent implements OnInit {
  private checkoutService = inject(CheckoutService);
  private route = inject(ActivatedRoute);

  registrationSent = false;
  order$: Observable<any>;
  notFound$: Observable<boolean>;

  ngOnInit() {
    const orderRequest$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('code')),
      filter((code): code is string => code !== null),
      map(code => this.checkoutService.getOrderByCode(code)),
      shareReplay(1)
    );

    this.order$ = orderRequest$.pipe(
      filter(order => order !== null)
    );

    this.notFound$ = orderRequest$.pipe(
      map(order => !order)
    );
  }

  register(order: any) {
    if (order.customer) {
      this.checkoutService.register({
        emailAddress: order.customer.emailAddress,
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
      }).subscribe(() => {
        this.registrationSent = true;
      });
    }
  }
} 