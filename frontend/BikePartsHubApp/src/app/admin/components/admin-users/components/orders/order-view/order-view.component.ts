import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponseWithDetails } from '../../../admin-customers.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css',
})
export class OrderViewComponent {
  @Input() order!: OrderResponseWithDetails;
  @Output() close = new EventEmitter<void>();

  totalAmount: number = 0;

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.order.orderDetails.reduce(
      (sum, detail) => sum + detail.amount * detail.qty,
      0
    );
  }

  getStatusClass(status: string): string {
    const classes = {
      SHIPPED: 'bg-green-600',
      PROCESSING: 'bg-yellow-600',
      CANCELED: 'bg-red-600',
      PENDING: 'bg-blue-600',
    };
    return classes[status as keyof typeof classes] || 'bg-gray-600';
  }

  onClose() {
    this.close.emit();
  }
}