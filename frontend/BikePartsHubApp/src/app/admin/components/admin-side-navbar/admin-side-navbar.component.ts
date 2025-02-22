import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';

@Component({
  selector: 'app-admin-side-navbar',
  templateUrl: './admin-side-navbar.component.html',
  styleUrl: './admin-side-navbar.component.css',
})
export class AdminSideNavbarComponent {
  constructor(private authService: AdminAuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login-admin']);
  }
}
