import { 
  HttpErrorResponse, 
  HttpEvent, 
  HttpHandlerFn,
  HttpRequest, 
  HttpResponse 
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DataService } from '../services/data.service';

/**
 * The default interceptor examines all HTTP requests & responses and displays any error notifications.
 */
export function defaultInterceptor(
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const dataService = inject(DataService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  function displayErrorNotification(message: string): void {
    // TODO: Implement your notification service
    console.error('Error:', message);
  }

  function notifyOnError(response: HttpResponse<any> | HttpErrorResponse) {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 0) {
        displayErrorNotification('Could not connect to server!');
      } else {
        displayErrorNotification(response.toString());
      }
    } else {
      // GraphQL errors still return 200 OK responses, but have the actual error message
      // inside the body of the response.
      const graphQLErrors = response.body?.errors;
      if (graphQLErrors && Array.isArray(graphQLErrors)) {
        const firstCode: string = graphQLErrors[0].extensions.code;
        if (firstCode === 'FORBIDDEN') {
          // auto logout needed?
        } else if (firstCode === 'CHANNEL_NOT_FOUND') {
          const message = graphQLErrors.map(err => err.message).join('\n');
          displayErrorNotification(message);
        } else {
          const message = graphQLErrors.map(err => err.message).join('\n');
          displayErrorNotification(message);
        }
      }
    }
  }

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          notifyOnError(event);
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          notifyOnError(err);
        } else {
          displayErrorNotification(err.message);
        }
      }
    })
  );
} 