import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAuthed()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
