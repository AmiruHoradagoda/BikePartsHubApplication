import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AdminAuthService } from './auth-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.adminAuthService.isAdminLoggedIn()) {
      return true;
    }

    this.router.navigate(['/admin/login-admin']);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
