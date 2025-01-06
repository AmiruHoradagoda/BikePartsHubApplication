// user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  currentUser: AuthenticationResponse | null = null;
  activeTab: 'profile' | 'orders' | 'settings' = 'profile';
  recentOrders = [
    { id: '#12345', date: '2025-01-03', status: 'Delivered', total: 129.99 },
    { id: '#12344', date: '2025-01-01', status: 'Processing', total: 79.99 },
    { id: '#12343', date: '2024-12-28', status: 'Shipped', total: 199.99 },
  ];

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

  updateProfile(): void {
    // Implement profile update logic
    console.log('Updating profile...');
  }

  changeTab(tab: 'profile' | 'orders' | 'settings'): void {
    this.activeTab = tab;
  }
}
