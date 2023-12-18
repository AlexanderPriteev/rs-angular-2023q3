import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentRoute = route.routeConfig?.path;
  if (authService.getToken()) return true;
  router.navigate(['/signin'], { skipLocationChange: !currentRoute });
  return false;
};
