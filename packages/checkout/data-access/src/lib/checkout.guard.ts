import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, StateService } from '@bigi-shop/shared-data-access';

import { GET_ORDER_FOR_CHECKOUT } from './checkout.graphql';

// Define the possible order states
type OrderState = 'AddingItems' | 'ArrangingPayment' | 'PaymentAuthorized' | 'PaymentSettled';

export const checkoutGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const dataService = inject(DataService);
  const stateService = inject(StateService);

  const orderState$ = dataService.query(GET_ORDER_FOR_CHECKOUT, undefined, 'cache-first').pipe(
    map(data => (data.activeOrder ? data.activeOrder.state : 'AddingItems') as OrderState),
  );

  const signedIn$ = stateService.select(state => state.signedIn);

  return combineLatest([orderState$, signedIn$]).pipe(
    map(([orderState, signedIn]) => {
      const componentName = route.component?.constructor.name;

      switch (componentName) {
        case 'CheckoutSignInComponent':
          if (signedIn) {
            router.navigate(['/checkout', 'shipping']);
            return false;
          }
          if (orderState === 'ArrangingPayment') {
            router.navigate(['/checkout', 'payment']);
            return false;
          }
          return orderState === 'AddingItems';

        case 'CheckoutShippingComponent':
          if (orderState === 'ArrangingPayment') {
            router.navigate(['/checkout', 'payment']);
            return false;
          }
          return orderState === 'AddingItems';

        case 'CheckoutPaymentComponent':
          if (orderState === 'AddingItems') {
            router.navigate(['/checkout']);
            return false;
          }
          return orderState === 'ArrangingPayment';

        case 'CheckoutConfirmationComponent':
          return true;

        default:
          return true;
      }
    }),
  );
}; 