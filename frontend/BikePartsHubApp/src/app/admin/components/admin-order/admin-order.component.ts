import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminOrderService } from './admin-order.service';
import { OrderResponse, OrderResponses } from './order.models';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orders: OrderResponse[] = [];
  currentPage = 0;
  totalPages = 0;
  currentStatus: string | null = null;
  selectedOrder: OrderResponse | null = null;
  readonly itemsPerPage = 9;

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.adminOrderService
      .getAllOrderDetails(this.currentStatus, this.currentPage)
      .subscribe({
        next: (response: OrderResponses) => {
          this.orders = response.orderResponses;
          this.totalPages = Math.ceil(response.dataCount / this.itemsPerPage);
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        },
      });
  }

  onOrderClick(order: OrderResponse): void {
    this.selectedOrder = order;
  }

  closeOrderView(): void {
    this.selectedOrder = null;
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchOrders();
    }
  }

  filterByStatus(status: string | null): void {
    this.currentStatus = status;
    this.currentPage = 0;
    this.fetchOrders();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}