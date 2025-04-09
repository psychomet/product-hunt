import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, FactoryProvider, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { firstValueFrom, map, take } from 'rxjs';

import { ActiveCustomerService, DataService, defaultInterceptor, GET_ACTIVE_CHANNEL } from '@bigi-shop/shared-data-access';
import {
  GET_ACTIVE_CHANNEL_TOKEN,
  GetActiveChannelQuery,
} from '@bigi-shop/shared-util-types';

import { routes } from '../routes/app.routes';

import { apolloConfig } from './apollo.config';

function getActiveChannelFactory(
  dataService: DataService
) {
  return dataService.query<GetActiveChannelQuery>(GET_ACTIVE_CHANNEL).pipe(
    take(1),
    map((data) => data.activeChannel)
  )
}

const getActiveChannelProvider: FactoryProvider = {
  provide: GET_ACTIVE_CHANNEL_TOKEN,
  useFactory: getActiveChannelFactory,
  deps: [DataService]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([defaultInterceptor])),
    apolloConfig,
    getActiveChannelProvider,
    provideAppInitializer(() => {
      const activeCustomerService = inject(ActiveCustomerService);
      return firstValueFrom(activeCustomerService.initializeActiveCustomer());
    })
  ],
};
