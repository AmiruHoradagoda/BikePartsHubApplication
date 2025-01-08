import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from './admin-order.service';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orders: any[] = [];
  currentPage = 0;
  totalPages = 0;
  selectedStatus: string | null = null; // For filtering by status
  currentStatus: string | null = null;

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.adminOrderService
      .getAllOrderDetails(this.selectedStatus, this.currentPage)
      .subscribe(
        (response: any) => {
          this.orders = response.orderResponses;
          this.totalPages = Math.ceil(response.dataCount / 9); // Assuming 9 items per page
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchOrders();
    }
  }

  filterByStatus(status: string | null): void {
    this.selectedStatus = status;
    this.currentStatus = status; 
    this.currentPage = 0; // Reset to first page
    this.fetchOrders();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
