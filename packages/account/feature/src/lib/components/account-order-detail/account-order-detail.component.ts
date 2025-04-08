import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable, switchMap } from 'rxjs';
import { GetOrderQuery, GetOrderQueryVariables, notNullOrUndefined } from '@bigi-shop/shared-util-types';
import { DataService } from '@bigi-shop/shared-data-access';
import { ActivatedRoute } from '@angular/router';
import { GET_ORDER } from './account-order-detail.graphql';
import { AddressCardComponent, CartContentsComponent, CartTotalsComponent } from '@bigi-shop/shared-ui';

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

