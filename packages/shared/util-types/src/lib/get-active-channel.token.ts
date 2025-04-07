import { InjectionToken } from '@angular/core';
import { GetActiveChannelQuery } from './generated-types';

export const GET_ACTIVE_CHANNEL_TOKEN = new InjectionToken<GetActiveChannelQuery['activeChannel']>('GET_ACTIVE_CHANNEL');
