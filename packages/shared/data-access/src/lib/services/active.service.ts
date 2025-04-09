import { inject,Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetActiveOrderQuery } from '@bigi-shop/shared-util-types';

import { GET_ACTIVE_ORDER } from '../graphql/active.graphql';

import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  private dataService = inject(DataService);
  
  activeOrder$: Observable<GetActiveOrderQuery['activeOrder'] | null> = this.dataService
    .query<GetActiveOrderQuery>(GET_ACTIVE_ORDER)
    .pipe(
      map(({ activeOrder }) => activeOrder)
    );

} 