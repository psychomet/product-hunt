import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';

import {
  CheckoutService,
  GET_ELIGIBLE_SHIPPING_METHODS,
  GET_ORDER_SHIPPING_DATA,
  SET_CUSTOMER_FOR_ORDER,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  TRANSITION_TO_ARRANGING_PAYMENT,
} from '@bigi-shop/checkout-data-access';
import {
  DataService,
  GET_AVAILABLE_COUNTRIES,
  GET_CUSTOMER_ADDRESSES,
  StateService,
} from '@bigi-shop/shared-data-access';
import {
  AddressFormComponent,
  FormatPricePipe,
  ModalService,
  NotificationService,
  RadioCardComponent,
  RadioCardFieldsetComponent,
} from '@bigi-shop/shared-ui';
import {
  AddressFragment,
  CreateAddressInput,
  GetAvailableCountriesQuery,
  GetCustomerAddressesQuery,
  GetEligibleShippingMethodsQuery,
  GetOrderShippingDataQuery,
  notNullOrUndefined,
  SetCustomerForOrderMutation,
  SetCustomerForOrderMutationVariables,
  SetShippingAddressMutation,
  SetShippingAddressMutationVariables,
  SetShippingMethodMutation,
  SetShippingMethodMutationVariables,
  TransitionToArrangingPaymentMutation,
} from '@bigi-shop/shared-util-types';

import { AddressModalComponent } from './address-modal/address-modal.component';

export type AddressFormValue = Pick<
  AddressFragment,
  Exclude<keyof AddressFragment, 'country'>
> & { countryCode: string };

@Component({
  selector: 'bigi-checkout-shipping',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressFormComponent,
    FormatPricePipe,
    RadioCardFieldsetComponent,
    RadioCardComponent,
  ],
  template: `
    <div
      class="card"
      *ngIf="(signedIn$ | async) && (customerAddresses$ | async)?.length"
    >
      <div class="card-header">
        <button class="btn btn-light" (click)="step = 'selectAddress'">
          Select Address
        </button>
      </div>
      <div class="" [ngClass]="step === 'selectAddress' ? 'block' : 'hidden'">
        <div class="d-flex flex-wrap">
          <div
            class="customer-address"
            *ngFor="let address of customerAddresses$ | async"
            (click)="setShippingAddress(address)"
            (keydown.enter)="setShippingAddress(address)"
            tabindex="0"
            role="button"
            [attr.aria-label]="'Select address: ' + getLines(address).join(', ')"
          >
            <div class="address-line" *ngFor="let line of getLines(address)">
              {{ line }}
            </div>
          </div>
          <div class="d-flex align-items-end ml-3 mb-3">
            <button class="btn btn-secondary" (click)="createAddress()">
              Add new address
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="" *ngIf="(signedIn$ | async) === false">
      <h2 class="text-lg font-medium text-gray-900">Contact information</h2>
      <form [formGroup]="contactForm" (focusout)="onCustomerFormBlur()">
        <div class="mt-4">
          <label
            htmlFor="emailAddress"
            class="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div class="mt-1">
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              autoComplete="email"
              formControlName="emailAddress"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label
              htmlFor="firstName"
              class="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <div class="mt-1">
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                formControlName="firstName"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              class="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <div class="mt-1">
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                formControlName="lastName"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="mt-10 border-t border-gray-200 pt-10">
      <h2 class="text-lg font-medium text-gray-900">Shipping Address</h2>
      <div class="card-body">
        <bigi-address-form
          #addressForm
          (focusout)="onAddressFormBlur(addressForm.addressForm)"
          [address]="shippingAddress$ | async"
          [availableCountries]="availableCountries$ | async"
        />
      </div>
    </div>
    <div class="mt-10 border-t border-gray-200 pt-10">
      <h2 class="text-lg font-medium text-gray-900">Shipping Method</h2>
      <bigi-radio-card-fieldset
        [idFn]="getId"
        [selectedItemId]="shippingMethodId"
        (selectItem)="setShippingMethod($event.id)"
      >
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <bigi-radio-card
            *ngFor="let method of eligibleShippingMethods$ | async"
            [item]="method"
          >
            <span class="block text-sm font-medium text-gray-900">
              {{ method.name }}
            </span>
            <span class="mt-6 text-sm font-medium text-gray-900">
              {{ method.priceWithTax | formatPrice }}
            </span>
          </bigi-radio-card>
        </div>
      </bigi-radio-card-fieldset>
    </div>
    <button
      class="btn-primary mt-6 w-full space-x-2"
      [disabled]="!shippingMethodId || addressForm.addressForm.invalid"
      (click)="proceedToPayment()"
    >
      <!-- <fa-icon icon="credit-card"></fa-icon> -->
      <span>Proceed to payment</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShippingComponent implements OnInit, OnDestroy {
  @ViewChild('addressForm') addressForm: AddressFormComponent;

  step = '';

  customerAddresses$: Observable<AddressFragment[]>;
  availableCountries$: Observable<
    GetAvailableCountriesQuery['availableCountries'] | any
  >;
  eligibleShippingMethods$: Observable<
    GetEligibleShippingMethodsQuery['eligibleShippingMethods']
  >;
  shippingAddress$: Observable<
    NonNullable<GetOrderShippingDataQuery['activeOrder']>['shippingAddress']
  >;
  signedIn$: Observable<boolean>;
  shippingMethodId: string | undefined;
  contactForm: UntypedFormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.email],
    });
    this.signedIn$ = this.stateService.select((state) => state.signedIn);
    this.customerAddresses$ = this.dataService
      .query<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES)
      .pipe(
        map(
          (data) =>
            (data.activeCustomer
              ? data.activeCustomer.addresses || []
              : []) as AddressFragment[]
        )
      );
    this.availableCountries$ = this.dataService
      .query<GetAvailableCountriesQuery>(GET_AVAILABLE_COUNTRIES)
      .pipe(map((data) => data.availableCountries));
    const shippingData$ = this.dataService.query<GetOrderShippingDataQuery>(
      GET_ORDER_SHIPPING_DATA
    );
    this.shippingAddress$ = shippingData$.pipe(
      map((data) => data.activeOrder && data.activeOrder.shippingAddress)
    );
    this.eligibleShippingMethods$ = this.shippingAddress$.pipe(
      switchMap(() =>
        this.dataService.query<GetEligibleShippingMethodsQuery>(
          GET_ELIGIBLE_SHIPPING_METHODS
        )
      ),
      map((data) => data.eligibleShippingMethods)
    );

    shippingData$
      .pipe(
        map((data) => data.activeOrder && data.activeOrder.customer),
        takeUntil(this.destroy$)
      )
      .subscribe((customer) => {
        if (customer) {
          this.contactForm.patchValue(
            {
              firstName: customer.firstName,
              lastName: customer.lastName,
              emailAddress: customer.emailAddress,
            },
            { emitEvent: false }
          );
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getLines(address: AddressFragment): string[] {
    return [
      address.fullName,
      address.company,
      address.streetLine1,
      address.streetLine2,
      address.province,
      address.postalCode,
      address.country.name,
    ].filter(notNullOrUndefined);
  }

  createAddress() {
    this.modalService
      .fromComponent(AddressModalComponent, {
        locals: {
          title: 'Create new address',
        },
        closable: true,
      })
      .pipe(
        switchMap(() =>
          this.dataService.query<GetCustomerAddressesQuery>(
            GET_CUSTOMER_ADDRESSES,
            {},
            'network-only'
          )
        )
      )
      .subscribe();
  }

  editAddress(address: AddressFragment) {
    this.addressForm.addressForm.patchValue({
      ...address,
      countryCode: address.country.code,
    });
  }

  onCustomerFormBlur() {
    this.setCustomerForOrder()?.subscribe();
  }

  onAddressFormBlur(addressForm: UntypedFormGroup) {
    if (addressForm.dirty && addressForm.valid) {
      this.setShippingAddress(addressForm.value);
    }
  }

  setShippingAddress(value: AddressFormValue | AddressFragment) {
    const input = this.valueToAddressInput(value);
    this.dataService
      .mutate<SetShippingAddressMutation, SetShippingAddressMutationVariables>(
        SET_SHIPPING_ADDRESS,
        {
          input,
        }
      )
      .subscribe((data) => {
        this.changeDetector.markForCheck();
      });
  }

  setShippingMethod(id: string) {
    this.shippingMethodId = id;
  }

  proceedToPayment() {
    const shippingMethodId = this.shippingMethodId;
    if (shippingMethodId) {
      this.stateService
        .select((state) => state.signedIn)
        .pipe(
          mergeMap((signedIn) =>
            !signedIn ? this.setCustomerForOrder() || of({}) : of({})
          ),
          mergeMap(() =>
            this.dataService.mutate<
              SetShippingMethodMutation,
              SetShippingMethodMutationVariables
            >(SET_SHIPPING_METHOD, {
              id: shippingMethodId,
            })
          ),
          mergeMap(() =>
            this.dataService.mutate<TransitionToArrangingPaymentMutation>(
              TRANSITION_TO_ARRANGING_PAYMENT
            )
          )
        )
        .subscribe((data) => {
          this.router.navigate(['../payment'], { relativeTo: this.route });
        });
    }
  }

  getId(method: { id: string }) {
    return method.id;
  }

  private setCustomerForOrder() {
    if (this.contactForm.valid) {
      return this.dataService
        .mutate<
          SetCustomerForOrderMutation,
          SetCustomerForOrderMutationVariables
        >(SET_CUSTOMER_FOR_ORDER, {
          input: this.contactForm.value,
        })
        .pipe(
          tap(({ setCustomerForOrder }) => {
            if (
              setCustomerForOrder &&
              setCustomerForOrder.__typename !== 'Order'
            ) {
              this.notificationService
                .error((setCustomerForOrder as any).message)
                .subscribe();
            }
          })
        );
    }
    return null;
  }

  private valueToAddressInput(
    value: AddressFormValue | AddressFragment
  ): CreateAddressInput {
    return {
      city: value.city || '',
      company: value.company || '',
      countryCode: this.isFormValue(value)
        ? value.countryCode
        : value.country.code,
      defaultBillingAddress: value.defaultBillingAddress,
      defaultShippingAddress: value.defaultShippingAddress,
      fullName: value.fullName || '',
      phoneNumber: value.phoneNumber || '',
      postalCode: value.postalCode || '',
      province: value.province || '',
      streetLine1: value.streetLine1 || '',
      streetLine2: value.streetLine2 || '',
      customFields: [],
    };
  }

  private isFormValue(
    input: AddressFormValue | AddressFragment
  ): input is AddressFormValue {
    return typeof (input as any).countryCode === 'string';
  }
}
