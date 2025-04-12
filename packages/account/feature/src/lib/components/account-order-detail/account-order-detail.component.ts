import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter, map, Observable, switchMap } from 'rxjs';

import { DataService } from '@product-hunt/shared-data-access';
import { AddressCardComponent, CartContentsComponent, CartTotalsComponent } from '@product-hunt/shared-ui';
import { GetOrderQuery, GetOrderQueryVariables, notNullOrUndefined } from '@product-hunt/shared-util-types';

import { GET_ORDER } from './account-order-detail.graphql';

@Component({
  selector: 'bigi-account-order-detail',
  imports: [CommonModule, CartContentsComponent, CartTotalsComponent, AddressCardComponent],
  templateUrl: './account-order-detail.component.html',
  styleUrl: './account-order-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountOrderDetailComponent implements OnInit {

  order$: Observable<GetOrderQuery['orderByCode'] | undefined>;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.order$ = this.route.paramMap.pipe(
          map(pm => pm.get('code')),
          filter(notNullOrUndefined),
          switchMap(code => {
              return this.dataService.query<GetOrderQuery, GetOrderQueryVariables>(GET_ORDER, { code });
          }),
          map(data => data.orderByCode),
      );
  }

}

