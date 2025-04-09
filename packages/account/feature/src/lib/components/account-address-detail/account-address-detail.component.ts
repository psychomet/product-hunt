import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter, map, Observable, switchMap } from 'rxjs';

import {
  DataService,
  GET_AVAILABLE_COUNTRIES,
  GET_CUSTOMER_ADDRESSES,
} from '@bigi-shop/shared-data-access';
import { AddressFormComponent } from '@bigi-shop/shared-ui';
import {
  CountryFragment,
  GetAvailableCountriesQuery,
  GetCustomerAddressesQuery,
  notNullOrUndefined,
  UpdateAddressInput,
  UpdateAddressMutation,
  UpdateAddressMutationVariables,
} from '@bigi-shop/shared-util-types';

import { UPDATE_ADDRESS } from './account-address-detail.graphql';

@Component({
  selector: 'bigi-account-address-detail',
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './account-address-detail.component.html',
  styleUrl: './account-address-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountAddressDetailComponent implements OnInit {
  address$: Observable<
    | NonNullable<
        NonNullable<GetCustomerAddressesQuery['activeCustomer']>['addresses']
      >[number]
    | undefined
  >;
  availableCountries$: Observable<
    GetAvailableCountriesQuery['availableCountries'] | any
  >;
  @ViewChild('addressForm', { static: true })
  private addressForm: AddressFormComponent;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.address$ = this.route.paramMap.pipe(
      map((pm) => pm.get('id')),
      filter(notNullOrUndefined),
      switchMap((id) =>
        this.dataService
          .query<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES)
          .pipe(
            map((data) => data.activeCustomer && data.activeCustomer.addresses),
            filter(notNullOrUndefined),
            map((addresses) => addresses.find((address) => address.id === id))
          )
      )
    );
    this.availableCountries$ = this.dataService
      .query<GetAvailableCountriesQuery>(GET_AVAILABLE_COUNTRIES)
      .pipe(map((data) => data.availableCountries));
  }

  updateAddress() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    const formValue = this.addressForm.addressForm.value;
    const input: UpdateAddressInput = {
      id,
      city: formValue.city,
      company: formValue.company,
      countryCode: formValue.countryCode,
      customFields: formValue.customFields,
      defaultBillingAddress: formValue.defaultBillingAddress,
      defaultShippingAddress: formValue.defaultShippingAddress,
      fullName: formValue.fullName,
      phoneNumber: formValue.phoneNumber,
      postalCode: formValue.postalCode,
      province: formValue.province,
      streetLine1: formValue.streetLine1,
      streetLine2: formValue.streetLine2,
    };
    this.dataService
      .mutate<UpdateAddressMutation, UpdateAddressMutationVariables>(
        UPDATE_ADDRESS,
        {
          input,
        }
      )
      .subscribe(() => {
        this.addressForm.addressForm.markAsPristine();
      });
  }
}
