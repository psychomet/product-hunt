import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutService, PaymentMethod, Order } from '@bigi-shop/checkout-data-access';

@Component({
  selector: 'bigi-checkout-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Error Message -->
      <div 
        *ngIf="paymentErrorMessage"
        class="mb-6 bg-red-50 border border-red-200 rounded-md p-4"
        role="alert"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ paymentErrorMessage }}</p>
          </div>
        </div>
      </div>

      <ng-container *ngFor="let paymentMethod of paymentMethods$ | async">
        <div class="mb-8">
          <h2 class="text-lg font-medium text-gray-900 mb-4">
            Pay with {{ paymentMethod.name }}
          </h2>

          <!-- Test Mode Warning -->
          <div class="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  This is a test payment form. Do not enter real card details!
                </p>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <form #paymentForm="ngForm" (ngSubmit)="completeOrder(paymentMethod.code)" class="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <!-- Card Number -->
            <div>
              <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card number</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  [(ngModel)]="cardNumber"
                  required
                  class="pl-10 block w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="4111 1111 1111 1111"
                >
              </div>
            </div>

            <!-- Expiry Date -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expMonth" class="block text-sm font-medium text-gray-700">Expiry month</label>
                <select
                  id="expMonth"
                  name="expMonth"
                  [(ngModel)]="expMonth"
                  required
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option [ngValue]="undefined">Month</option>
                  <option *ngFor="let month of getMonths()" [ngValue]="month">
                    {{ month }}
                  </option>
                </select>
              </div>

              <div>
                <label for="expYear" class="block text-sm font-medium text-gray-700">Expiry year</label>
                <select
                  id="expYear"
                  name="expYear"
                  [(ngModel)]="expYear"
                  required
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option [ngValue]="undefined">Year</option>
                  <option *ngFor="let year of getYears()" [ngValue]="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                [disabled]="paymentForm.invalid || paymentForm.pristine"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Complete order
              </button>
            </div>
          </form>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentComponent implements OnInit {
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cardNumber = '';
  expMonth: number | undefined;
  expYear: number | undefined;
  paymentMethods$: Observable<PaymentMethod[]>;
  paymentErrorMessage: string | undefined;

  ngOnInit() {
    this.paymentMethods$ = this.checkoutService.getEligiblePaymentMethods();
  }

  getMonths(): number[] {
    return Array.from({ length: 12 }).map((_, i) => i + 1);
  }

  getYears(): number[] {
    const year = new Date().getFullYear();
    return Array.from({ length: 10 }).map((_, i) => year + i);
  }

  completeOrder(paymentMethodCode: string) {
    this.checkoutService.addPayment({
      method: paymentMethodCode,
      metadata: {
        cardNumber: this.cardNumber,
        expiryMonth: this.expMonth,
        expiryYear: this.expYear,
      },
    }).subscribe({
      next: (result: Order | { __typename: string; message: string }) => {
        if ('state' in result) {
          if (result.state === 'PaymentSettled' || result.state === 'PaymentAuthorized') {
            setTimeout(() => {
              this.router.navigate(['../confirmation', result.code], { relativeTo: this.route });
            }, 500);
          }
        } else {
          this.paymentErrorMessage = result.message;
        }
      },
      error: (error: Error) => {
        this.paymentErrorMessage = 'An error occurred while processing your payment. Please try again.';
      }
    });
  }
} 