import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '@bigi-shop/checkout-data-access';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bigi-checkout-shipping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <!-- Customer Details Section -->
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
            <p class="mt-1 text-sm text-gray-600">
              Please enter your contact details.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form [formGroup]="customerForm" (blur)="onCustomerFormBlur()">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <label for="emailAddress" class="block text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      id="emailAddress" 
                      type="email" 
                      formControlName="emailAddress" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="customerForm.get('emailAddress')?.invalid && customerForm.get('emailAddress')?.touched"
                    >
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input 
                      id="firstName" 
                      type="text" 
                      formControlName="firstName" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="customerForm.get('firstName')?.invalid && customerForm.get('firstName')?.touched"
                    >
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input 
                      id="lastName" 
                      type="text" 
                      formControlName="lastName" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="customerForm.get('lastName')?.invalid && customerForm.get('lastName')?.touched"
                    >
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Shipping Address Section -->
        <div class="md:col-span-1 mt-10 md:mt-0">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Shipping Address</h3>
            <p class="mt-1 text-sm text-gray-600">
              Please enter your shipping details.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form [formGroup]="shippingForm" (blur)="onAddressFormBlur()">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      id="fullName" 
                      type="text" 
                      formControlName="fullName" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="shippingForm.get('fullName')?.invalid && shippingForm.get('fullName')?.touched"
                    >
                  </div>

                  <div class="col-span-6">
                    <label for="streetLine1" class="block text-sm font-medium text-gray-700">Street Address</label>
                    <input 
                      id="streetLine1" 
                      type="text" 
                      formControlName="streetLine1" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="shippingForm.get('streetLine1')?.invalid && shippingForm.get('streetLine1')?.touched"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <input 
                      id="city" 
                      type="text" 
                      formControlName="city" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="shippingForm.get('city')?.invalid && shippingForm.get('city')?.touched"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="province" class="block text-sm font-medium text-gray-700">State / Province</label>
                    <input 
                      id="province" 
                      type="text" 
                      formControlName="province" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="shippingForm.get('province')?.invalid && shippingForm.get('province')?.touched"
                    >
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input 
                      id="postalCode" 
                      type="text" 
                      formControlName="postalCode" 
                      class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      [class.border-red-500]="shippingForm.get('postalCode')?.invalid && shippingForm.get('postalCode')?.touched"
                    >
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Shipping Methods Section -->
        <div class="md:col-span-1 mt-10 md:mt-0">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Shipping Method</h3>
            <p class="mt-1 text-sm text-gray-600">
              Please select your preferred shipping method.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="space-y-4">
                <ng-container *ngIf="eligibleShippingMethods$ | async as methods">
                  <div *ngFor="let method of methods" class="flex items-center">
                    <input
                      [id]="method.id"
                      name="shippingMethod"
                      type="radio"
                      [value]="method.id"
                      (change)="setShippingMethod(method.id)"
                      [checked]="selectedShippingMethodId === method.id"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                    >
                    <label [for]="method.id" class="ml-3">
                      <span class="block text-sm font-medium text-gray-700">{{ method.name }}</span>
                      <span class="block text-sm text-gray-500">{{ method.description }}</span>
                      <span class="block text-sm font-medium text-gray-900">{{ method.priceWithTax | currency }}</span>
                    </label>
                  </div>
                </ng-container>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                [disabled]="!canProceedToPayment()"
                (click)="proceedToPayment()"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShippingComponent implements OnInit, OnDestroy {
  private checkoutService = inject(CheckoutService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  eligibleShippingMethods$ = this.checkoutService.getEligibleShippingMethods();
  selectedShippingMethodId: string | undefined;

  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
  });

  shippingForm = this.fb.group({
    fullName: ['', Validators.required],
    streetLine1: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    postalCode: ['', Validators.required],
  });

  ngOnInit() {
    // Load active order data
    this.checkoutService.getActiveOrder().pipe(
      takeUntil(this.destroy$)
    ).subscribe(order => {
      if (order?.customer) {
        this.customerForm.patchValue({
          firstName: order.customer.firstName,
          lastName: order.customer.lastName,
          emailAddress: order.customer.emailAddress,
        }, { emitEvent: false });
      }
      if (order?.shippingAddress) {
        this.shippingForm.patchValue(order.shippingAddress, { emitEvent: false });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCustomerFormBlur() {
    if (this.customerForm.valid && this.customerForm.dirty) {
      const { firstName, lastName, emailAddress } = this.customerForm.value;
      if (firstName && lastName && emailAddress) {
        this.checkoutService.setCustomerDetails({ firstName, lastName, emailAddress });
      }
    }
  }

  onAddressFormBlur() {
    if (this.shippingForm.valid && this.shippingForm.dirty) {
      const { fullName, streetLine1, city, province, postalCode } = this.shippingForm.value;
      if (fullName && streetLine1 && city && province && postalCode) {
        this.checkoutService.setShippingAddress({ fullName, streetLine1, city, province, postalCode });
      }
    }
  }

  setShippingMethod(methodId: string) {
    this.selectedShippingMethodId = methodId;
  }

  canProceedToPayment(): boolean {
    return this.customerForm.valid && this.shippingForm.valid && !!this.selectedShippingMethodId;
  }

  proceedToPayment() {
    if (this.canProceedToPayment() && this.selectedShippingMethodId) {
      this.checkoutService.setShippingMethod(this.selectedShippingMethodId)
        .pipe(
          switchMap(() => this.checkoutService.transitionToPayment())
        )
        .subscribe(() => {
          this.router.navigate(['/checkout/payment']);
        });
    }
  }
} 