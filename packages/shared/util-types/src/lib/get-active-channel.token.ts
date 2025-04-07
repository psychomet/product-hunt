import { InjectionToken } from '@angular/core';
import { GetActiveChannelQuery } from './generated-types';
import { Observable } from 'rxjs';

export const GET_ACTIVE_CHANNEL_TOKEN = new InjectionToken<Observable<GetActiveChannelQuery['activeChannel']>>('GET_ACTIVE_CHANNEL');
