// admin-order-view.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../order.models';
import { AdminOrderService } from '../admin-order.service';

type OrderStatusType = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELED';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrl: './admin-order-view.component.css',
})
export class AdminOrderViewComponent {
  @Input() order!: OrderResponse;
  @Output() close = new EventEmitter<void>();
  @Output() statusUpdated = new EventEmitter<void>();

  // Define OrderStatus as a static object
  readonly OrderStatus = {
    PENDING: 'PENDING' as OrderStatusType,
    PROCESSING: 'PROCESSING' as OrderStatusType,
    SHIPPED: 'SHIPPED' as OrderStatusType,
    CANCELED: 'CANCELED' as OrderStatusType,
  };

  currentStatus!: OrderStatusType;
  isUpdating: boolean = false;

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.currentStatus = this.order.status;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case this.OrderStatus.PENDING:
        return 'bg-yellow-500';
      case this.OrderStatus.PROCESSING:
        return 'bg-blue-500';
      case this.OrderStatus.SHIPPED:
        return 'bg-green-500';
      case this.OrderStatus.CANCELED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  getProgressPercentage(status: OrderStatusType): number {
    switch (status) {
      case this.OrderStatus.PENDING:
        return 0;
      case this.OrderStatus.PROCESSING:
        return 50;
      case this.OrderStatus.SHIPPED:
        return 100;
      default:
        return 0;
    }
  }

  onStatusChange(status: OrderStatusType): void {
    this.currentStatus = status;
  }

  async applyChanges(): Promise<void> {
    if (this.currentStatus === this.order.status) {
      return;
    }

    this.isUpdating = true;
    try {
      await this.adminOrderService
        .changeOrderStatus(this.order.orderId, this.currentStatus)
        .toPromise();

      this.order.status = this.currentStatus;
      this.statusUpdated.emit();
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
