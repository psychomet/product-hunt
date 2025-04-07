import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DataService,
  GET_ACTIVE_CUSTOMER,
  StateService,
} from '@bigi-shop/shared-data-access';
import { GetActiveCustomerQuery } from '@bigi-shop/shared-util-types';
import { map, Observable, switchMap, take } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bigi-account-link',
  imports: [CommonModule, RouterLink],
  templateUrl: './account-link.component.html',
  styleUrl: './account-link.component.css',
})
export class AccountLinkComponent implements OnInit {
  activeCustomer$: Observable<GetActiveCustomerQuery['activeCustomer']>;
  private dataService = inject(DataService);
  private stateService = inject(StateService);

  ngOnInit() {
    const getActiveCustomer$ = this.dataService.query<GetActiveCustomerQuery>(
      GET_ACTIVE_CUSTOMER,
      {},
      'network-only'
    );

    getActiveCustomer$.pipe(take(1)).subscribe((data) => {
        console.log('data',data)
      if (data.activeCustomer) {
        this.stateService.setState('signedIn', true);
      }
    });

    this.activeCustomer$ = this.stateService
      .select((state) => state.signedIn)
      .pipe(
        switchMap(() => getActiveCustomer$),
        map((data) => data && data.activeCustomer)
      );
  }

  userName(
    customer: NonNullable<GetActiveCustomerQuery['activeCustomer']>
  ): string {
    const { firstName, lastName, emailAddress } = customer;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return emailAddress;
    }
  }
}
