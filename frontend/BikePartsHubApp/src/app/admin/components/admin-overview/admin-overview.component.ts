import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';

interface Product {
  id: number;
  name: string;
  image: string;
  sold: number;
  stock: number;
}

interface ChartData {
  month: string;
  orders: number;
  appointments: number;
}

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css'],
})
export class AdminOverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  // Stats
  newCustomers: number = 2345;
  ordersLastMonth: number = 2345;
  appointmentsLastMonth: number = 2345;
  totalUsers: number = 234453243;
  currentYear: number = 2025;

  // Chart data
  chartData: ChartData[] = [];

  // Products
  bestSellingProducts: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadChartData();
    this.loadBestSellingProducts();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  private loadChartData(): void {
    // This would typically come from an API
    this.chartData = [
      { month: 'January', orders: 1200, appointments: 850 },
      { month: 'February', orders: 1400, appointments: 820 },
      { month: 'March', orders: 1600, appointments: 800 },
      { month: 'April', orders: 1800, appointments: 750 },
      { month: 'May', orders: 2000, appointments: 720 },
      { month: 'June', orders: 2200, appointments: 680 },
      { month: 'July', orders: 2400, appointments: 650 },
    ];
  }

  private initializeChart(): void {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartData.map((item) => item.month),
        datasets: [
          {
            label: 'Orders',
            data: this.chartData.map((item) => item.orders),
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 1)',
            pointBackgroundColor: 'rgba(239, 68, 68, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(239, 68, 68, 1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: 'Appointments',
            data: this.chartData.map((item) => item.appointments),
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 1)',
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgba(229, 231, 235, 0.5)',
            },
          },
          y: {
            grid: {
              color: 'rgba(229, 231, 235, 0.5)',
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 5,
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    });
  }

  private loadBestSellingProducts(): void {
    // This would typically come from an API
    this.bestSellingProducts = [
      {
        id: 1,
        name: 'Dragons FZ 460 ++',
        image:
          'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        sold: 234,
        stock: 134,
      },
      {
        id: 2,
        name: 'Dragons FZ 460 ++',
        image:
          'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        sold: 234,
        stock: 134,
      },
      {
        id: 3,
        name: 'Dragons FZ 460 ++',
        image:
          'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        sold: 234,
        stock: 134,
      },
    ];
  }
}
