import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { makeStateKey,TransferState } from '@angular/core';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { ApolloLink, InMemoryCache } from '@apollo/client/core';

const STATE_KEY = makeStateKey<any>('apollo.state');

function mergeFields(existing: any, incoming: any) {
  return { ...existing, ...incoming };
}

function replaceFields(existing: any, incoming: any) {
  return incoming;
}

export const apolloConfig = provideApollo(() => {
  const httpLink = inject(HttpLink);
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);
  const AUTH_TOKEN_KEY = 'auth_token';

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          eligibleShippingMethods: {
            merge: replaceFields,
          },
          activeOrder: {
            merge: replaceFields,
          },
        },
      },
      Product: {
        fields: {
          customFields: {
            merge: mergeFields,
          },
        },
      },
      Collection: {
        fields: {
          customFields: {
            merge: mergeFields,
          },
        },
      },
      Order: {
        fields: {
          lines: {
            merge: replaceFields,
          },
          shippingLines: {
            merge: replaceFields,
          },
          discounts: {
            merge: replaceFields,
          },
          shippingAddress: {
            merge: replaceFields,
          },
          billingAddress: {
            merge: replaceFields,
          },
        },
      },
      Customer: {
        fields: {
          addresses: {
            merge: replaceFields,
          },
          customFields: {
            merge: mergeFields,
          },
        },
      },
    },
  });

  const http = httpLink.create({
    uri: 'http://localhost:3000/shop-api',
    withCredentials: true
  });

  const afterware = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const authHeader = context['response']?.headers.get('vendure-auth-token');

      if (authHeader && isPlatformBrowser(platformId)) {
        localStorage.setItem(AUTH_TOKEN_KEY, authHeader);
      }
      return response;
    });
  });

  const middleware = new ApolloLink((operation, forward) => {
    let headers = new HttpHeaders();
    
    if (isPlatformBrowser(platformId)) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    operation.setContext({
      headers
    });
    
    return forward(operation);
  });

  const isBrowser = isPlatformBrowser(platformId);

  if (isBrowser && transferState.hasKey(STATE_KEY)) {
    const state = transferState.get(STATE_KEY, null);
    if (state) {
      cache.restore(state);
    }
  }

  if (!isBrowser) {
    transferState.onSerialize(STATE_KEY, () => {
      return cache.extract();
    });
  }

  return {
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'network-only',
      },
    },
    ssrMode: !isBrowser,
    link: ApolloLink.from([middleware, afterware, http]),
  };
}); 