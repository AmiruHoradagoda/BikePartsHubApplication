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
  pageSize = 9;
  searchTerm = '';
  totalPages = 0;
  currentRole?: string;

  constructor(private customerService: AdminCustomersService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService
      .getAllCustomers(
        this.searchTerm,
        this.currentRole,
        this.currentPage,
        this.pageSize
      )
      .subscribe((response) => {
        this.customers = Array.from(response);
      });
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
    this.currentPage = page;
    this.loadCustomers();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  setRole(role?: string) {
    this.currentRole = role;
    this.currentPage = 0;
    this.loadCustomers();
  }
}
