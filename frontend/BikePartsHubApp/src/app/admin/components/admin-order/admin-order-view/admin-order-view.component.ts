import { Component } from '@angular/core';
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  items: OrderItem[];
  deliveryAddress: {
    line1: string;
    line2: string;
    line3: string;
  };
  totalAmount: number;
  status: 'pending' | 'on-the-way' | 'completed';
  isVip: boolean;
}
@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrl: './admin-order-view.component.css',
})
export class AdminOrderViewComponent {
  order: Order = {
    id: '#01470523',
    customerName: 'Amiru Miththa',
    customerEmail: 'amiru@gmail.com',
    orderDate: '21st October 2024',
    items: [
      {
        id: 1,
        name: 'Bike Cover',
        quantity: 3,
        price: 300,
        image: 'assets/bike-cover.jpg',
      },
      {
        id: 2,
        name: 'Bike brakes',
        quantity: 2,
        price: 3056,
        image: 'assets/bike-brakes.jpg',
      },
    ],
    deliveryAddress: {
      line1: 'Galauda yaya',
      line2: 'Lama manasa',
      line3: 'Kolunuwara',
    },
    totalAmount: 23000,
    status: 'on-the-way',
    isVip: true,
  };

  activeTab = 'orders';

  constructor() {}

  ngOnInit(): void {}

  getProgressWidth(): string {
    switch (this.order.status) {
      case 'pending':
        return '33%';
      case 'on-the-way':
        return '66%';
      case 'completed':
        return '100%';
      default:
        return '0%';
    }
  }

  onBackToOrders(): void {
    // Implement navigation logic
    console.log('Navigating back to orders');
  }

  onCancelOrder(): void {
    // Implement cancel order logic
    console.log('Cancelling order:', this.order.id);
  }
}
