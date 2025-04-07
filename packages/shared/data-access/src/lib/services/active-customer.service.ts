import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay, switchMap, take } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

import { GetActiveCustomerQuery } from '@bigi-shop/shared-util-types';
import { GET_ACTIVE_CUSTOMER } from '../graphql/documents.graphql';

@Injectable({
  providedIn: 'root',
})
export class ActiveCustomerService {
  private dataService = inject(DataService);
  private stateService = inject(StateService);

  getActiveCustomer$ = this.dataService
    .query<GetActiveCustomerQuery>(GET_ACTIVE_CUSTOMER, {}, 'network-only')
    .pipe(shareReplay(1));

  initializeActiveCustomer() {
    return this.getActiveCustomer$.pipe(
      take(1),
      map((data) => {
        if (data.activeCustomer) {
          this.stateService.setState('signedIn', true);
        }
        return data.activeCustomer;
      })
    );
  }

  watchActiveCustomer(): Observable<GetActiveCustomerQuery['activeCustomer']> {
    return this.stateService
      .select((state) => state.signedIn)
      .pipe(
        switchMap(() => this.getActiveCustomer$),
        map((data) => data && data.activeCustomer)
      );
  }
}
