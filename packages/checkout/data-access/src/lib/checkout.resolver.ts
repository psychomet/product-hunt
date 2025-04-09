import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

import { ActiveService } from '@bigi-shop/shared-data-access';


export type ActiveOrderStream = Observable<any>;

export const checkoutResolver: ResolveFn<ActiveOrderStream> = (route, state) => {
  const activeService = inject(ActiveService);
  
  const activeOrder$ = activeService.activeOrder$;

  const stream = activeOrder$.pipe(
    shareReplay(1),
  );

  return stream.pipe(
    take(1),
    map(() => stream),
  );
}; 