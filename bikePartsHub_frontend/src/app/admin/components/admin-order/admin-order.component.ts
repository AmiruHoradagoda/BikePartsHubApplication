import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from './admin-order.service';
import { OrderResponse, OrderResponses } from './order.models';
// Import jsPDF and jspdf-autotable properly
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  // Added for sort dropdown
  showSortDropdown: boolean = false;
  currentSortField: string = 'date';
  currentSortDirection: 'asc' | 'desc' = 'desc';

  // Added for report generation
  showReportModal: boolean = false;
  reportYear: number = new Date().getFullYear();
  reportMonth: number = new Date().getMonth() + 1;
  isGeneratingReport: boolean = false;

  // Years and months for dropdown
  availableYears: number[] = [];
  availableMonths: { name: string; value: number }[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  constructor(private adminOrderService: AdminOrderService) {
    // Set up available years (current year and 2 previous years)
    const currentYear = new Date().getFullYear();
    this.availableYears = [currentYear, currentYear - 1, currentYear - 2];
  }

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
          // Apply current sort
          this.applySorting();
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

  // Added methods for sorting
  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  sortOrders(field: string, direction: 'asc' | 'desc'): void {
    this.currentSortField = field;
    this.currentSortDirection = direction;
    this.applySorting();
    this.showSortDropdown = false;
  }

  private applySorting(): void {
    // Sort the orders array based on current sort settings
    this.orders.sort((a, b) => {
      let comparison = 0;

      if (this.currentSortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        comparison = dateA - dateB;
      } else if (this.currentSortField === 'total') {
        comparison = a.total - b.total;
      }

      // Reverse if descending
      return this.currentSortDirection === 'desc' ? -comparison : comparison;
    });
  }

  // Report generation methods
  toggleReportModal(): void {
    this.showReportModal = !this.showReportModal;
  }

  generateReport(): void {
    this.isGeneratingReport = true;
    console.log(`Generating report for ${this.reportMonth}/${this.reportYear}`);

    try {
      // Fetch orders for the selected month and year
      this.adminOrderService
        .getMonthlyOrderReport(this.reportYear, this.reportMonth)
        .subscribe({
          next: (orders: OrderResponse[]) => {
            console.log(`Received ${orders?.length || 0} orders from API`);

            // Add a timeout to prevent UI freezing during PDF generation
            setTimeout(() => {
              try {
                this.createPdf(orders);
                this.isGeneratingReport = false;
                this.showReportModal = false;
              } catch (err) {
                console.error('Error creating PDF:', err);
                this.isGeneratingReport = false;
                alert('Failed to generate PDF. Please try again.');
              }
            }, 100);
          },
          error: (error) => {
            console.error('Error fetching report data:', error);
            this.isGeneratingReport = false;
            alert(
              'Failed to fetch order data. Please check your network connection and try again.'
            );
          },
        });
    } catch (e) {
      console.error('Unexpected error in generateReport:', e);
      this.isGeneratingReport = false;
      alert('An unexpected error occurred. Please try again later.');
    }
  }

  private createPdf(orders: OrderResponse[]): void {
    // Check if orders array is empty or undefined
    if (!orders || orders.length === 0) {
      console.warn('No orders data available for the selected period');
      alert('No orders found for the selected period');
      this.isGeneratingReport = false;
      this.showReportModal = false;
      return;
    }

    // Create a new PDF document
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width;

    // Add title
    const monthName =
      this.availableMonths.find((m) => m.value === this.reportMonth)?.name ||
      '';
    const title = `Monthly List - Orders`;
    const subtitle = `${monthName} ${this.reportYear}`;

    doc.setFontSize(20);
    doc.text(title, pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(16);
    doc.text(subtitle, pageWidth / 2, 30, { align: 'center' });

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    doc.setFontSize(12);
    doc.text(
      `Total Revenue from orders: Rs. ${totalRevenue.toLocaleString()}`,
      14,
      45
    );

    // Prepare data for the table
    const tableRows = orders.map((order, index) => {
      // Format date as DD/MM/YYYY
      const orderDate = new Date(order.date);
      const formattedDate = `${orderDate
        .getDate()
        .toString()
        .padStart(2, '0')}/${(orderDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${orderDate.getFullYear()}`;

      return [
        (index + 1).toString(),
        `#${order.orderId}`,
        order.shippingAddress?.address || 'N/A',
        formattedDate,
        `Rs ${order.total}`,
        `${order.firstName || ''} ${order.lastName || ''}`,
        order.orderDetails
          ? order.orderDetails
              .reduce((sum, detail) => sum + detail.qty, 0)
              .toString()
          : '-',
        order.status || 'N/A',
      ];
    });

    // Define table headers
    const headers = [
      '#',
      'Order ID',
      'Address',
      'Ordered Date',
      'Total Price',
      'Customer Name',
      'Items',
      'Status',
    ];

    // Use autoTable directly with proper type handling
    autoTable(doc, {
      head: [headers],
      body: tableRows,
      startY: 55,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [128, 0, 128] },
      alternateRowStyles: { fillColor: [240, 240, 245] },
      margin: { top: 60 },
    });

    // Save the PDF with try-catch to detect any errors
    try {
      doc.save(`Orders_${monthName}_${this.reportYear}.pdf`);
      console.log('PDF download initiated');
    } catch (err) {
      console.error('Error saving PDF:', err);
      // Fallback method for downloading if the default method fails
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Orders_${monthName}_${this.reportYear}.pdf`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }
}
