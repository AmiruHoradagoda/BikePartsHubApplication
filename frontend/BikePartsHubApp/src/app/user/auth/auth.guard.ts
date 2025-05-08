import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      // Store the attempted URL for redirecting
      const currentUser = this.authService.getCurrentUser();

      // Check if user role matches required roles (if specified)
      const requiredRoles = route.data['roles'] as string[];
      if (requiredRoles && currentUser) {
        if (!requiredRoles.includes(currentUser.role)) {
          // Role not authorized, redirect to home page
          this.router.navigate(['/']);
          return false;
        }
      }

      return true;
    }

    // Not logged in, redirect to login page with return url
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
