import { Component, OnInit } from '@angular/core';
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

  Math = Math;

  constructor(private customerService: AdminCustomersService) {}

  ngOnInit() {
    this.loadCustomers();
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
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading customers:', err);
          this.error = 'Failed to load customers. Please try again later.';
          this.isLoading = false;
        },
      });
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
