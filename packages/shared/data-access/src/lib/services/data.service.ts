import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { FetchPolicy, MutationFetchPolicy, NetworkStatus } from '@apollo/client/core';
import { DocumentNode } from 'graphql';

import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private apollo: Apollo,
    private stateService: StateService
  ) {}

  query<T = any, V extends Record<string, any> = Record<string, any>>(
    query: DocumentNode,
    variables?: V,
    fetchPolicy: FetchPolicy = 'cache-first'
  ): Observable<T> {
    return this.apollo
      .watchQuery<T>({
        query,
        variables,
        fetchPolicy,
      })
      .valueChanges.pipe(
        filter(result => result.networkStatus === NetworkStatus.ready),
        map(response => response.data as T))
  }

  watchQuery<T = any, V extends Record<string, any> = Record<string, any>>(
    query: DocumentNode,
    variables?: V,
    fetchPolicy: FetchPolicy = 'cache-first'
  ): Observable<T> {
    return this.apollo
      .watchQuery<T>({
        query,
        variables,
        fetchPolicy,
      })
      .valueChanges
      .pipe(map(response => response.data as T));
  }

  mutate<T = any, V extends Record<string, any> = Record<string, any>>(
    mutation: DocumentNode,
    variables?: V,
    fetchPolicy: MutationFetchPolicy = 'network-only'
  ): Observable<T> {
    return this.apollo
      .mutate<T>({
        mutation,
        variables,
        fetchPolicy,
      })
      .pipe(map(response => response.data as T));
  }

  resetStore() {
    return this.apollo.client.resetStore();
  }
} 