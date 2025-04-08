import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import {
  DataService,
  GET_CUSTOMER_ADDRESSES,
} from '@bigi-shop/shared-data-access';
import { GetCustomerAddressesQuery } from '@bigi-shop/shared-util-types';
import { AddressCardComponent } from '@bigi-shop/shared-ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bigi-account-address-book',
  imports: [CommonModule, AddressCardComponent, RouterLink],
  templateUrl: './account-address-book.component.html',
  styleUrl: './account-address-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountAddressBookComponent implements OnInit {
  addresses$: Observable<
    | NonNullable<GetCustomerAddressesQuery['activeCustomer']>['addresses']
    | undefined
  >;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.addresses$ = this.dataService
      .query<GetCustomerAddressesQuery>(GET_CUSTOMER_ADDRESSES)
      .pipe(
        map((data) => data.activeCustomer && data.activeCustomer.addresses)
      );
  }
}
