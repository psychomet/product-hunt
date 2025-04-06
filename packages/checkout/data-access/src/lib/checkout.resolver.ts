import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { DataService } from '@bigi-shop/shared-data-access';

import { GET_ACTIVE_ORDER } from './checkout.graphql';

export type ActiveOrderStream = Observable<any>;

export const checkoutResolver: ResolveFn<ActiveOrderStream> = (route, state) => {
  const dataService = inject(DataService);
  
  const activeOrder$ = dataService.query(GET_ACTIVE_ORDER).pipe(
    map(data => data.activeOrder),
  );

  const stream = activeOrder$.pipe(
    shareReplay(1),
  );

  return stream.pipe(
    take(1),
    map(() => stream),
  );
}; 