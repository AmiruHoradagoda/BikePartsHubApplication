// src/app/order-confirmation/order-confirmation.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent implements OnInit {
  orderNumber: string = '';
  orderTotal: number = 0;
  orderDate: Date = new Date();
  estimatedDelivery: Date = new Date();
  paymentMethod: string = 'Credit Card';

  constructor(private router: Router) {
    // Get the order data from router state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      orderNumber: string;
      total: number;
      paymentMethod?: string;
    };

    if (state) {
      this.orderNumber = state.orderNumber;
      this.orderTotal = state.total;
      this.paymentMethod = this.formatPaymentMethod(state.paymentMethod);
    } else {
      // Redirect to home if no order data is available
      this.router.navigate(['/']);
    }

    // Set estimated delivery date (7 days from now)
    this.estimatedDelivery = new Date(this.orderDate);
    this.estimatedDelivery.setDate(this.estimatedDelivery.getDate() + 7);
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  // Navigate to order tracking page
  trackOrder(): void {
    this.router.navigate(['/track-order'], {
      queryParams: { orderNumber: this.orderNumber },
    });
  }

  // Navigate to the shop page
  continueShopping(): void {
    this.router.navigate(['/products?category=PARTS']);
  }

  private formatPaymentMethod(paymentMethod?: string): string {
    switch (paymentMethod) {
      case 'paypal':
        return 'PayPal';
      case 'cash_on_delivery':
        return 'Cash on Delivery';
      default:
        return 'PayPal';
    }
  }
}
