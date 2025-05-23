import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AdminCustomersService,
  UserResponseDto,
} from './admin-customers.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  customers: UserResponseDto[] = [];
  currentPage = 0;
  pageSize = 5;
  searchTerm = '';
  totalPages = 0;
  totalItems = 0;
  currentRole?: string;
  isLoading = false;
  error: string | null = null;
  appointmentCounts: Map<number, number> = new Map(); // To store appointment counts by user ID

  Math = Math;
  constructor(
    private customerService: AdminCustomersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  navigateToCustomer(customerId: string) {
    this.router.navigate(['/admin/customer-view', customerId]);
  }

  loadCustomers() {
    this.isLoading = true;
    this.error = null;

    this.customerService
      .getAllCustomers(
        this.searchTerm,
        this.currentRole,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.customers = response.userResponseDtos;
          this.totalItems = response.dataCount;
          this.calculateTotalPages();
          this.loadAppointmentCounts();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading customers:', err);
          this.error = 'Failed to load customers. Please try again later.';
          this.isLoading = false;
        },
      });
  }

  // Load appointment counts for users
  loadAppointmentCounts() {
    // Reset the map
    this.appointmentCounts = new Map();

    // For each customer, get their appointment count
    this.customers.forEach((customer) => {
      if (customer.userId) {
        this.customerService
          .getCustomerAppointments(customer.userId)
          .subscribe({
            next: (appointments) => {
              this.appointmentCounts.set(customer.userId, appointments.length);
            },
            error: (err) => {
              console.error(
                `Error loading appointments for user ${customer.userId}:`,
                err
              );
              this.appointmentCounts.set(customer.userId, 0);
            },
          });
      }
    });
  }

  // Get appointment count for a specific customer
  getAppointmentCount(customer: UserResponseDto): number {
    if (!customer.userId) return 0;
    return this.appointmentCounts.get(customer.userId) || 0;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  calculateTotalSpent(customer: UserResponseDto): number {
    if (!customer.orders) return 0;
    return customer.orders.reduce((sum, order) => sum + (order.total || 0), 0);
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 0;
    this.loadCustomers();
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadCustomers();
    }
  }

  getPages(): number[] {
    const totalPageCount = Math.max(this.totalPages, 1);
    const currentPage = this.currentPage;

    const maxPages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPageCount, startPage + maxPages);

    if (endPage - startPage < maxPages && startPage > 0) {
      startPage = Math.max(0, endPage - maxPages);
    }

    return Array.from(
      { length: Math.min(maxPages, endPage - startPage) },
      (_, i) => startPage + i
    );
  }

  setRole(role?: string) {
    this.currentRole = role;
    this.currentPage = 0;
    this.loadCustomers();
  }

  isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }
}
