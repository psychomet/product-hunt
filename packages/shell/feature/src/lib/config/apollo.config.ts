import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';

const STATE_KEY = makeStateKey<NormalizedCacheObject>('apollo.state');

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
    withCredentials: true,
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
    if (isPlatformBrowser(platformId)) {
      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY) || null}`,
        ),
      });
    }
    return forward(operation);
  });

  const isBrowser = transferState.hasKey(STATE_KEY);

  if (isBrowser) {
    const state = transferState.get(STATE_KEY, {} as NormalizedCacheObject);
    cache.restore(state);
  } else {
    transferState.onSerialize(STATE_KEY, () => {
      return cache.extract();
    });
    cache.reset();
  }

  return {
    cache,
    ssrMode: true,
    ssrForceFetchDelay: 500,
    link: ApolloLink.from([middleware, afterware, http]),
  };
}); 