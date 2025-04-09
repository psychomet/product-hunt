import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { map, Observable } from 'rxjs';

import { DataService } from '@bigi-shop/shared-data-access';
import { FormatPricePipe } from '@bigi-shop/shared-ui';
import { GetOrderListQuery, GetOrderListQueryVariables, SortOrder } from '@bigi-shop/shared-util-types';

import { GET_ORDER_LIST } from './account-order-list.graphql';
@Component({
  selector: 'bigi-account-order-list',
  imports: [CommonModule, RouterLink, FormatPricePipe],
  templateUrl: './account-order-list.component.html',
  styleUrl: './account-order-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountOrderListComponent implements OnInit {

  orders$: Observable<NonNullable<GetOrderListQuery['activeCustomer']>['orders']['items'] | undefined>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
      this.orders$ = this.dataService.query<GetOrderListQuery, GetOrderListQueryVariables>(GET_ORDER_LIST, {
          options: {
              filter: {
                  active: {
                      eq: false,
                  },
              },
              sort: {
                  createdAt: SortOrder.DESC,
              },
          } as any,
      }).pipe(
          map(data => data.activeCustomer && data.activeCustomer.orders.items),
      );
  }
}
