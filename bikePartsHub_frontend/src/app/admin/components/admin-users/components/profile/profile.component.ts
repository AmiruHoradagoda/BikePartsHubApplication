// profile.component.ts
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminCustomersService, CustomerProfileDto } from '../../admin-customers.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() userId!: string;
  @ViewChild('orderChart') orderChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('appointmentChart')
  appointmentChartRef!: ElementRef<HTMLCanvasElement>;

  profile: CustomerProfileDto | undefined;
  loading = true;
  error = '';
  private charts: Chart[] = [];

  constructor(private adminCustomersService: AdminCustomersService) {}

  ngOnInit() {
    if (this.userId) {
      this.loadCustomerProfile(parseInt(this.userId));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && !changes['userId'].firstChange) {
      this.loadCustomerProfile(parseInt(this.userId));
    }
  }

  ngAfterViewInit() {
    // Charts will be created after profile data is loaded
  }

  ngOnDestroy() {
    this.charts.forEach((chart) => chart?.destroy());
  }

  loadCustomerProfile(userId: number) {
    this.loading = true;
    this.charts.forEach((chart) => chart.destroy());
    this.charts = [];

    this.adminCustomersService.getCustomerProfile(userId).subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
        // Create charts after data is loaded
        requestAnimationFrame(() => {
          this.createCharts();
        });
      },
      error: (error) => {
        this.error = 'Failed to load customer profile';
        this.loading = false;
        console.error('Error loading profile:', error);
      },
    });
  }

  private createCharts() {
    try {
      // Only create order chart if there are orders
      if (this.profile && this.profile.totalOrder > 0) {
        this.createOrderChart();
      }

      // Only create appointment chart if there are appointments
      if (this.profile && this.profile.totalSchedule > 0) {
        this.createAppointmentChart();
      }
    } catch (error) {
      console.error('Error creating charts:', error);
    }
  }

  private createOrderChart() {
    const ctx = this.orderChartRef?.nativeElement?.getContext('2d');
    if (!ctx || !this.profile) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Cancelled', 'On the way', 'Completed'],
        datasets: [
          {
            data: [
              this.profile.o_pending,
              this.profile.o_cancelled,
              this.profile.o_onTheWay,
              this.profile.o_completed,
            ],
            backgroundColor: ['#8B4513', '#90EE90', '#FFA500', '#B0C4DE'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right' as const,
            labels: {
              boxWidth: 12,
            },
          },
        },
      },
    });
    this.charts.push(chart);
  }

  private createAppointmentChart() {
    const ctx = this.appointmentChartRef?.nativeElement?.getContext('2d');
    if (!ctx || !this.profile) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Missed', 'Attended', 'Upcoming', 'Completed'],
        datasets: [
          {
            data: [
              this.profile.a_missed,
              this.profile.a_attended,
              this.profile.a_upcoming,
              this.profile.a_completed,
            ],
            backgroundColor: ['#8B4513', '#FFA500', '#B0C4DE', '#90EE90'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right' as const,
            labels: {
              boxWidth: 12,
            },
          },
        },
      },
    });
    this.charts.push(chart);
  }

  private calculateOrderStats() {
    const orders = this.profile?.customerResponse.orders || [];
    return {
      pending: orders.filter((order) => order.status === 'PENDING').length,
      cancelled: orders.filter((order) => order.status === 'CANCELLED').length,
      onTheWay: orders.filter((order) => order.status === 'ON_THE_WAY').length,
      completed: orders.filter((order) => order.status === 'COMPLETED').length,
    };
  }
}
