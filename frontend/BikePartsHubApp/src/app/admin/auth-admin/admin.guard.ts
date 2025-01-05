import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './auth-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.adminAuthService.isAdminLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login-admin']);
    return false;
  }
}
