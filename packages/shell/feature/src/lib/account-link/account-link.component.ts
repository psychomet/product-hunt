import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { ActiveCustomerService } from '@product-hunt/shared-data-access';
import { GetActiveCustomerQuery } from '@product-hunt/shared-util-types';

@Component({
  selector: 'bigi-account-link',
  imports: [CommonModule, RouterLink],
  templateUrl: './account-link.component.html',
  styleUrl: './account-link.component.css',
})
export class AccountLinkComponent implements OnInit {
  activeCustomer$: Observable<GetActiveCustomerQuery['activeCustomer']>;
  private activeCustomerService = inject(ActiveCustomerService);

  ngOnInit() {
    this.activeCustomer$ = this.activeCustomerService.watchActiveCustomer();
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
