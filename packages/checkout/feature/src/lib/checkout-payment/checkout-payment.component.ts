import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutService, PaymentMethod, Order, GET_ELIGIBLE_PAYMENT_METHODS, ADD_PAYMENT } from '@bigi-shop/checkout-data-access';
import { AddPaymentMutation, AddPaymentMutationVariables, GetEligiblePaymentMethodsQuery } from '@bigi-shop/shared-util-types';
import { DataService, StateService } from '@bigi-shop/shared-data-access';

@Component({
  selector: 'bigi-checkout-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
   <div class="alert alert-danger" role="alert" *ngIf="paymentErrorMessage">
    {{ paymentErrorMessage }}
</div>
<ng-container *ngFor="let paymentMethod of paymentMethods$ | async">
    <h4 class="font-medium">Pay with method "{{ paymentMethod.code }}"</h4>
    <div class="alert alert-info my-4" role="alert">
        This is an example payment form. Do not use real card details!
    </div>
    <form class="border bg-white rounded p-4 max-w-sm" #paymentForm="ngForm" (submit)="completeOrder(paymentMethod.code)">
        <div class="flex items-center space-x-2">
            <div class="w-16 text-gray-600">
                <!-- <fa-icon icon="credit-card"></fa-icon> -->
            </div>
            <input type="text"
                   class="block flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                   name="cardNumber"
                   [required]="true"
                   [(ngModel)]="cardNumber"
                   placeholder="Credit card #">
        </div>

        <div class="flex items-center mt-4 space-x-2">
            <label class="w-16 text-gray-600" for="month">Expiry</label>
            <select
                class="block flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                id="month" name="expMonth" [(ngModel)]="expMonth" [required]="true">
                <option selected [ngValue]="undefined">Month</option>
                <option *ngFor="let month of getMonths()" [ngValue]="month">
                    {{ month }}
                </option>
            </select>
            <select
                class="block flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                id="year" name="expYear" [(ngModel)]="expYear" [required]="true">
                <option selected [ngValue]="undefined">Year</option>
                <option *ngFor="let year of getYears()" [ngValue]="year">
                    {{ year }}
                </option>
            </select>

        </div>
        <button class="btn-primary w-full mt-6"
                [disabled]="paymentForm.pristine || paymentForm.invalid">Complete order
        </button>
    </form>
</ng-container>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentComponent implements OnInit {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  paymentMethods$: Observable<GetEligiblePaymentMethodsQuery['eligiblePaymentMethods']>
  paymentErrorMessage: string | undefined;

  constructor(private dataService: DataService,
              private stateService: StateService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.paymentMethods$ = this.dataService.query<GetEligiblePaymentMethodsQuery>(GET_ELIGIBLE_PAYMENT_METHODS)
          .pipe(map(res => res.eligiblePaymentMethods));
  }

  getMonths(): number[] {
      return Array.from({ length: 12 }).map((_, i) => i + 1);
  }

  getYears(): number[] {
      const year = new Date().getFullYear();
      return Array.from({ length: 10 }).map((_, i) => year + i);
  }

  completeOrder(paymentMethodCode: string) {
      this.dataService.mutate<AddPaymentMutation, AddPaymentMutationVariables>(ADD_PAYMENT, {
          input: {
              method: paymentMethodCode,
              metadata: {},
          },
      })
          .subscribe(async ({ addPaymentToOrder }) => {
              switch (addPaymentToOrder?.__typename) {
                  case 'Order':
                      const order = addPaymentToOrder;
                      if (order && (order.state === 'PaymentSettled' || order.state === 'PaymentAuthorized')) {
                          await new Promise<void>(resolve => setTimeout(() => {
                              this.stateService.setState('activeOrderId', null);
                              resolve();
                          }, 500));
                          this.router.navigate(['../confirmation', order.code], { relativeTo: this.route });
                      }
                      break;
                  case 'OrderPaymentStateError':
                  case 'PaymentDeclinedError':
                  case 'PaymentFailedError':
                  case 'OrderStateTransitionError':
                      this.paymentErrorMessage = addPaymentToOrder.message;
                      break;
              }

          });
  }
}
