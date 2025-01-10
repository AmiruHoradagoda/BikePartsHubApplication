import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationResponse } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import {
  UserDashboardService,
  OrderResponseDto,
  UserResponseDto,
} from './user-dashboard.service';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  currentUser: AuthenticationResponse | null = null;
  activeTab: 'profile' | 'orders' | 'settings' = 'profile';
  recentOrders: OrderResponseDto[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  userDetails: UserResponseDto | null = null;
  profileForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private userDashboardService: UserDashboardService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.subscribeToUserChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToUserChanges(): void {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user) {
          this.loadUserDetails(user.userId);
        }
      },
      error: (error) => {
        console.error('Error getting current user:', error);
      },
    });
  }

  private loadUserDetails(userId: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.userDashboardService
      .getUserDetails(userId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error loading user details:', error);
          this.errorMessage =
            error.error?.message || 'Failed to load user details';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.userDetails = response;
            this.recentOrders = response.orders || [];
            this.updateFormWithUserDetails(response);
          }
        },
        error: (error) => {
          console.error('Error in subscription:', error);
        },
      });
  }

  private updateFormWithUserDetails(details: UserResponseDto): void {
    this.profileForm.patchValue({
      firstName: details.firstName || '',
      lastName: details.lastName || '',
      email: details.email || '',
      address: details.address || '',
      phone: details.phone || '',
    });
  }

  updateProfile(): void {
    if (!this.currentUser?.userId || !this.profileForm.valid) {
      this.errorMessage = 'Invalid form data';
      return;
    }

    const updatedProfile = this.profileForm.value;
    this.isLoading = true;
    this.errorMessage = null;

    this.userDashboardService
      .updateUserProfile(this.currentUser.userId, updatedProfile)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error updating profile:', error);
          this.errorMessage =
            error.error?.message || 'Failed to update profile';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        if (response) {
          this.userDetails = response;
          this.updateFormWithUserDetails(response);
        }
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  retryLoad(): void {
    if (this.currentUser) {
      this.loadUserDetails(this.currentUser.userId);
    }
  }

  changeTab(tab: 'profile' | 'orders' | 'settings'): void {
    this.activeTab = tab;
  }

  formatDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return date;
    }
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status?.toLowerCase()) {
      case 'pending':
        return `${baseClasses} bg-green-900  text-yellow-300`;
      case 'processing':
        return `${baseClasses} bg-yellow-900 text-green-300 `;
      case 'shipped':
        return `${baseClasses} bg-blue-900 text-blue-300`;
      case 'canceled':
        return `${baseClasses} bg-blue-900 text-red-300`;
      default:
        return `${baseClasses} bg-gray-900 text-gray-300`;
    }
  }
}
