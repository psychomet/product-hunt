import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filter, map, Observable } from 'rxjs';

import { DataService, StateService } from '@bigi-shop/shared-data-access';
import { GetAccountOverviewQuery, notNullOrUndefined } from '@bigi-shop/shared-util-types';

import { GET_ACCOUNT_OVERVIEW } from './account-dashboard.graphql';

@Component({
  selector: 'bigi-account-dashboard',
  imports: [CommonModule],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDashboardComponent implements OnInit {

  activeCustomer$: Observable<GetAccountOverviewQuery['activeCustomer']>;
  constructor(private dataService: DataService,
              private stateService: StateService,
              private router: Router) { }

  ngOnInit() {
      this.activeCustomer$ = this.dataService.query<GetAccountOverviewQuery>(GET_ACCOUNT_OVERVIEW).pipe(
          map(data => data.activeCustomer),
          filter(notNullOrUndefined),
      );
  }
}

