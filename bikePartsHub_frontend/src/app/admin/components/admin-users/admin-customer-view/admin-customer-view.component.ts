import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminCustomersService } from '../admin-customers.service';

@Component({
  selector: 'app-admin-customer-view',
  templateUrl: './admin-customer-view.component.html',
  styleUrls: ['./admin-customer-view.component.css'],
})
export class AdminCustomerViewComponent implements OnInit {
  activeTab = 'Profile';
  tabs = ['Profile', 'Orders', 'Schedules'];
  userId!: string;
  profile: any; // Replace with proper interface

  // Role management properties
  customerRole: string = 'CUSTOMER'; // Default value, should be updated when profile loads
  showConfirmDialog: boolean = false;
  originalRole: string = '';
  newRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private adminCustomersService: AdminCustomersService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    // Fetch user profile data here
    this.fetchUserProfile();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  fetchUserProfile() {
    this.adminCustomersService.getCustomerProfile(+this.userId).subscribe(
      (data) => {
        this.profile = data;
        this.customerRole = data.customerResponse.role;
        console.log('Customer profile loaded:', data);
      },
      (error) => {
        console.error('Error fetching customer profile:', error);
      }
    );
  }

  confirmRoleChange(event: any) {
    // Store original role before showing confirmation
    this.originalRole = this.customerRole;
    this.newRole = event.target.value;

    // Reset the select to the original value until confirmed
    event.target.value = this.originalRole;

    // Show confirmation dialog
    this.showConfirmDialog = true;
  }

  cancelRoleChange() {
    this.showConfirmDialog = false;
    this.newRole = '';
  }

  confirmAndChangeRole() {
    // Call API to change role
    this.adminCustomersService
      .changeCustomerRole(+this.userId, this.newRole)
      .subscribe(
        (response: string) => {
          // Update local state after successful change
          this.customerRole = this.newRole;
          this.showConfirmDialog = false;

          // You might want to show a success notification here
          console.log('Role changed successfully:', response);
        },
        (error: unknown) => {
          console.error('Error changing customer role:', error);
          // You might want to show an error notification here
          this.showConfirmDialog = false;
        }
      );
  }
}