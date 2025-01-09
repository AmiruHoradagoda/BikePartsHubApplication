import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../order.models';
@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrl: './admin-order-view.component.css',
})
export class AdminOrderViewComponent {
  @Input() order!: OrderResponse;
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'PROCESSING':
        return 'bg-blue-500';
      case 'SHIPPED':
        return 'bg-green-500';
      case 'CANCELED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }
  onClose(): void {
    this.close.emit();
  }
}
