import { Route } from '@angular/router';
import { checkoutGuard, checkoutResolver } from '@bigi-shop/checkout-data-access';

export const checkoutFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./checkout-process/checkout-process.component').then(
        (m) => m.CheckoutProcessComponent
      ),
    resolve: {
      activeOrder: checkoutResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./checkout-sign-in/checkout-sign-in.component').then(
            (m) => m.CheckoutSignInComponent
          ),
        canActivate: [checkoutGuard],
      },
      {
        path: 'shipping',
        loadComponent: () =>
          import('./checkout-shipping/checkout-shipping.component').then(
            (m) => m.CheckoutShippingComponent
          ),
        canActivate: [checkoutGuard],
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./checkout-payment/checkout-payment.component').then(
            (m) => m.CheckoutPaymentComponent
          ),
        canActivate: [checkoutGuard],
      },
      {
        path: 'confirmation/:code',
        loadComponent: () =>
          import('./checkout-confirmation/checkout-confirmation.component').then(
            (m) => m.CheckoutConfirmationComponent
          ),
        canActivate: [checkoutGuard],
      },
    ],
  },
];
