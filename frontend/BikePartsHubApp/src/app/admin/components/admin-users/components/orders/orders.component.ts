import { Component, Input, OnInit } from '@angular/core';
import { AdminCustomersService, OrderResponseWithDetails } from '../../admin-customers.service';

@Component({
 selector: 'app-orders',
 templateUrl: './orders.component.html',
 styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
 @Input() userId!: string;

 allOrders: OrderResponseWithDetails[] = [];
 filteredOrders: OrderResponseWithDetails[] = [];
 orders: OrderResponseWithDetails[] = [];
 currentStatus: string | null = null;
 currentPage = 0;
 pageSize = 9;
 totalItems = 0;
 selectedOrder: OrderResponseWithDetails | null = null;
 loading = false;
 error: string | null = null;

 readonly ORDER_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'CANCELED'] as const;

 statusCounts = {
   PENDING: 0,
   PROCESSING: 0,
   SHIPPED: 0,
   CANCELED: 0,
   TOTAL: 0,
 };

 constructor(private adminCustomersService: AdminCustomersService) {}

 ngOnInit() {
   this.loadOrders();
 }

 loadOrders() {
   this.loading = true;
   this.adminCustomersService
     .getCustomerOrders(parseInt(this.userId), undefined, this.currentPage, this.pageSize)
     .subscribe({
       next: (response) => {
         this.allOrders = response.orderResponses;
         this.applyStatusFilter();
         this.calculateStatusCounts();
         this.loading = false;
       },
       error: (error) => {
         this.error = 'Failed to load orders';
         this.loading = false;
         console.error('Error loading orders:', error);
       },
     });
 }

 applyStatusFilter() {
   if (this.currentStatus) {
     this.filteredOrders = this.allOrders.filter(
       (order) => order.status === this.currentStatus
     );
   } else {
     this.filteredOrders = [...this.allOrders];
   }
   this.totalItems = this.filteredOrders.length;

   // Apply pagination to filtered orders
   const startIndex = this.currentPage * this.pageSize;
   const endIndex = startIndex + this.pageSize;
   this.orders = this.filteredOrders.slice(startIndex, endIndex);
 }

 calculateStatusCounts() {
   this.statusCounts = {
     PENDING: 0,
     PROCESSING: 0,
     SHIPPED: 0,
     CANCELED: 0,
     TOTAL: this.allOrders.length,
   };

   this.allOrders.forEach((order) => {
     if (this.statusCounts.hasOwnProperty(order.status)) {
       this.statusCounts[order.status as keyof typeof this.statusCounts]++;
     }
   });
 }

 getStatusColor(status: string): string {
   switch (status) {
     case 'PENDING':
       return 'text-blue-600';
     case 'PROCESSING':
       return 'text-yellow-600';
     case 'SHIPPED':
       return 'text-green-600';
     case 'CANCELED':
       return 'text-red-600';
     default:
       return 'text-gray-600';
   }
 }

 filterByStatus(status: string | null) {
   this.currentStatus = status;
   this.currentPage = 0;
   this.applyStatusFilter();
 }

 onPageChange(page: number) {
   this.currentPage = page;
   this.applyStatusFilter();
 }

 getTotalPages(): number {
   return Math.ceil(this.filteredOrders.length / this.pageSize);
 }

 getPages(): number[] {
   return Array.from({ length: this.getTotalPages() }, (_, i) => i);
 }

 onOrderClick(order: OrderResponseWithDetails) {
   this.selectedOrder = order;
 }

 closeOrderView() {
   this.selectedOrder = null;
   this.loadOrders();
 }
}