import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import { GET_ACTIVE_ORDER } from '../graphql/active.graphql';
import { Cart } from '@bigi-shop/shared-util-types';

export interface GetActiveOrderQuery {
  activeOrder: Cart | null;
}

@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  private dataService = inject(DataService);
  
  activeOrder$: Observable<Cart | null> = this.dataService
    .query<GetActiveOrderQuery>(GET_ACTIVE_ORDER, {}, 'network-only')
    .pipe(
      map(({ activeOrder }) => activeOrder)
    );

  refresh() {
    this.dataService.query<GetActiveOrderQuery>(GET_ACTIVE_ORDER, {}, 'network-only').subscribe();
  }
} 