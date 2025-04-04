import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { FetchPolicy, MutationFetchPolicy } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .query<T>({
        query,
        variables,
        fetchPolicy,
      })
      .pipe(map(response => response.data as T));
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