import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css',
})
export class AdminOrderComponent {
  orders = [
    {
      index: 1,
      orderId: '#01470523',
      address: '4/45, Spring Valley Rd, Hindagoda, Badulla 90000',
      date: new Date('2025-01-20'),
      totalPrice: 47200,
      status: 'Complete',
    },
    {
      index: 2,
      orderId: '#01470524',
      address: '9/56, High Street, Colombo 00300',
      date: new Date('2025-01-21'),
      totalPrice: 24000,
      status: 'Pending',
    },
    {
      index: 3,
      orderId: '#01470525',
      address: '3/22, Green Lane, Galle 80000',
      date: new Date('2025-01-22'),
      totalPrice: 53000,
      status: 'Canceled',
    },
  ];

  currentPage = 0;
  totalPages = 10; // Assuming there are 10 pages of data

  constructor() {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      // You can implement API calls here to fetch data for the selected page
      console.log(`Page changed to: ${page}`);
    }
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
