import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map } from 'rxjs/operators';

import {  StateService} from '@product-hunt/shared-data-access';

export const AccountGuard: CanActivateFn = () => {
  const router = inject(Router);
  const stateService = inject(StateService);

  return stateService.select(select => select.signedIn).pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/account/sign-in']);
        return false;
      }
      return true;
    })
  );
}; 