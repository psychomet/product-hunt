import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, shareReplay, switchMap, take } from 'rxjs/operators';

import { CheckoutService, GET_ORDER_BY_CODE } from '@bigi-shop/checkout-data-access';
import { DataService, REGISTER, StateService } from '@bigi-shop/shared-data-access';
import { CartContentsComponent, CartTotalsComponent } from '@bigi-shop/shared-ui';
import { GetOrderByCodeQuery, GetOrderByCodeQueryVariables, notNullOrUndefined, RegisterMutation, RegisterMutationVariables } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-checkout-confirmation',
  standalone: true,
  imports: [CommonModule, CartContentsComponent, CartTotalsComponent],
  template: `
    <div *ngIf="order$ | async as order">
    <div class="text-center">
        <h2 class="text-3xl">Thank you for your order!</h2>
        <ul class="mt-4">
            <li class="space-x-2"><span class="">Order code:</span><span
                class="text-gray-600 font-medium">{{ order.code }}</span></li>
            <li class="space-x-2"><span class="">Placed:</span><span
                class="text-gray-600 font-medium">{{ order.updatedAt | date: 'medium' }}</span></li>
        </ul>
    </div>

    <div *ngIf="!order.customer.user" class="border rounded bg-white max-w-md mx-auto p-4 my-4">
        <p class="lead">Create an account to enjoy faster checkouts, order tracking, order history and more!</p>
        <button class="btn-primary mx-auto mt-6 block"
                (click)="register()"
                [disabled]="registrationSent">
            Create account
        </button>
        <div *ngIf="registrationSent" class="mt-4 border-green-200 bg-green-50 p-4 text-sm text-green-700">
            Great! Now check your email ({{ order.customer.emailAddress }}) to complete registration.
        </div>
    </div>
    <div class="mt-12">
        <bigi-cart-contents [cart]="order"
                           [canAdjustQuantities]="false" />
        <bigi-cart-totals [cart]="order" />
    </div>
</div>
<ng-container *ngIf="notFound$ | async">
    <h2 class="display-4">Page not found</h2>
</ng-container>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutConfirmationComponent implements OnInit {
  registrationSent = false;
  order$: Observable<GetOrderByCodeQuery['orderByCode']>;
  notFound$: Observable<boolean>;

  constructor(private stateService: StateService,
              private dataService: DataService,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute) { }

  ngOnInit() {
      const orderRequest$ = this.route.paramMap.pipe(
          map(paramMap => paramMap.get('code')),
          filter(notNullOrUndefined),
          switchMap(code => this.dataService.query<GetOrderByCodeQuery, GetOrderByCodeQueryVariables>(
              GET_ORDER_BY_CODE,
              { code },
          )),
          map(data => data.orderByCode),
          shareReplay(1),
      );
      this.order$ = orderRequest$.pipe(
          filter(notNullOrUndefined),
      );
      this.notFound$ = orderRequest$.pipe(
          map(res => !res),
      );
  }

  register() {
      this.order$.pipe(
          take(1),
          mergeMap(order => {
              const customer = order?.customer;
              if (customer) {
                  return this.dataService.mutate<RegisterMutation, RegisterMutationVariables>(REGISTER, {
                      input: {
                          emailAddress: customer.emailAddress,
                          firstName: customer.firstName,
                          lastName: customer.lastName,
                      } as any,
                  });
              } else {
                  return of({});
              }
          }),
      ).subscribe(() => {
          this.registrationSent = true;
          this.changeDetector.markForCheck();
      });
  }
}
