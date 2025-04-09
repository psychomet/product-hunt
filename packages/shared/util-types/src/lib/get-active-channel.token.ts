import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { GetActiveChannelQuery } from './generated-types';

export const GET_ACTIVE_CHANNEL_TOKEN = new InjectionToken<Observable<GetActiveChannelQuery['activeChannel']>>('GET_ACTIVE_CHANNEL');
