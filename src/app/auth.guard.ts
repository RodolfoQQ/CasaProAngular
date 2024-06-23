import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from './auth/service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const autService=inject(ServiceService)
  const router=inject(Router)
    if (autService.isLogged()) {
      return true;
    }
    router.navigate(["/login"], {queryParams:{blokedPage:state.url}})
  return false;
};
