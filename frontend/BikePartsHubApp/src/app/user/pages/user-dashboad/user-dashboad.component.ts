import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationResponse } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-user-dashboad',
  templateUrl: './user-dashboad.component.html',
  styleUrl: './user-dashboad.component.css'
})
export class UserDashboadComponent {
 currentUser: AuthenticationResponse | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error getting current user:', error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
