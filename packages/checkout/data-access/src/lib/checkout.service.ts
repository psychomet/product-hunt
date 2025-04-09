import { inject,Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActiveService, DataService, REGISTER } from '@bigi-shop/shared-data-access';
import { Cart, GetActiveOrderQuery } from '@bigi-shop/shared-util-types';

import {
  ADD_PAYMENT,
  GET_ELIGIBLE_PAYMENT_METHODS,
  GET_ELIGIBLE_SHIPPING_METHODS,
  GET_ORDER_BY_CODE,
  SET_CUSTOMER_FOR_ORDER,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  TRANSITION_TO_ARRANGING_PAYMENT,
} from './checkout.graphql';

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface ShippingAddress {
  fullName: string;
  streetLine1: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  priceWithTax: number;
}

export interface PaymentMethod {
  id: string;
  code: string;
  name: string;
  description: string;
  isEligible: boolean;
  eligibilityMessage?: string;
}

export interface PaymentInput {
  method: string;
  metadata: {
    cardNumber?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
}

export interface Order {
  id: string;
  code: string;
  state: string;
  customer?: CustomerDetails;
  shippingAddress?: ShippingAddress;
}

export interface RegisterCustomerInput {
  emailAddress: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private dataService = inject(DataService);
  private router = inject(Router);
  private activeService = inject(ActiveService);

  getActiveOrder(): Observable<GetActiveOrderQuery['activeOrder']> {
    return this.activeService.activeOrder$;
  }

  getEligibleShippingMethods(): Observable<ShippingMethod[]> {
    return this.dataService.query(GET_ELIGIBLE_SHIPPING_METHODS).pipe(
      map(({ eligibleShippingMethods }) => eligibleShippingMethods)
    );
  }

  setCustomerDetails(details: CustomerDetails): Observable<Cart> {
    return this.dataService.mutate(SET_CUSTOMER_FOR_ORDER, { input: details }).pipe(
      map(({ setCustomerForOrder }) => setCustomerForOrder)
    );
  }

  setShippingAddress(address: ShippingAddress): Observable<Cart> {
    return this.dataService.mutate(SET_SHIPPING_ADDRESS, { input: address }).pipe(
      map(({ setOrderShippingAddress }) => setOrderShippingAddress)
    );
  }

  setShippingMethod(methodId: string): Observable<Cart> {
    return this.dataService.mutate(SET_SHIPPING_METHOD, { id: [methodId] }).pipe(
      map(({ setOrderShippingMethod }) => setOrderShippingMethod)
    );
  }

  proceedAsGuest(): void {
    this.router.navigate(['/checkout/shipping']);
  }

  transitionToPayment(): Observable<Cart> {
    return this.dataService.mutate(TRANSITION_TO_ARRANGING_PAYMENT).pipe(
      map(({ transitionOrderToState }) => transitionOrderToState)
    );
  }

  getEligiblePaymentMethods(): Observable<PaymentMethod[]> {
    return this.dataService.query(GET_ELIGIBLE_PAYMENT_METHODS).pipe(
      map(({ eligiblePaymentMethods }) => eligiblePaymentMethods)
    );
  }

  addPayment(input: PaymentInput): Observable<GetActiveOrderQuery['activeOrder']> {
    return this.dataService.mutate(ADD_PAYMENT, { input }).pipe(
      map(({ addPaymentToOrder }) => addPaymentToOrder)
    );
  }

  getOrderByCode(code: string): Observable<any> {
    return this.dataService.query(GET_ORDER_BY_CODE, { code }).pipe(
      map(data => data.orderByCode)
    );
  }

  register(input: RegisterCustomerInput): Observable<any> {
    return this.dataService.mutate(REGISTER, {
      input: {
        ...input,
        password: this.generateTemporaryPassword()
      }
    });
  }

  private generateTemporaryPassword(): string {
    return Math.random().toString(36).slice(-8);
  }
} 