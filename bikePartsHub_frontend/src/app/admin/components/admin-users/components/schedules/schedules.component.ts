import { Component, Input, OnInit } from '@angular/core';
import { AdminCustomersService, AppointmentResponseDto, AppointmentStatus } from '../../admin-customers.service';
interface StatusOption {
  value: AppointmentStatus;
  label: string;
}



@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent implements OnInit {
  @Input() userId!: string;

  appointments: AppointmentResponseDto[] = [];
  filteredAppointments: AppointmentResponseDto[] = [];
  loading = false;
  error: string | null = null;
  currentStatus = AppointmentStatus.ALL;
  selectedAppointment: AppointmentResponseDto | null = null;

  readonly AppointmentStatus = AppointmentStatus;

  readonly STATUSES: StatusOption[] = [
    { value: AppointmentStatus.COMPLETED, label: 'Completed' },
    { value: AppointmentStatus.ATTENDED, label: 'Attended' },
    { value: AppointmentStatus.UPCOMING, label: 'Upcoming' },
    { value: AppointmentStatus.MISSED, label: 'Missed' },
  ];

  constructor(private adminCustomersService: AdminCustomersService) {}

  ngOnInit(): void {
    if (!this.userId) {
      this.error = 'User ID is required';
      return;
    }
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.error = null;

    this.adminCustomersService
      .getCustomerAppointments(parseInt(this.userId))
      .subscribe({
        next: (appointments) => {
          this.appointments = appointments;
          this.applyFilter();
        },
        error: (error) => {
          console.error('Error loading appointments:', error);
          this.error = 'Failed to load appointments. Please try again.';
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  applyFilter(): void {
    this.filteredAppointments =
      this.currentStatus === AppointmentStatus.ALL
        ? [...this.appointments]
        : this.appointments.filter(
            (app) => app.appointmentStatus === this.currentStatus
          );
  }

  filterByStatus(status: AppointmentStatus): void {
    this.currentStatus = status;
    this.applyFilter();
  }

  getStatusCount(status: AppointmentStatus): number {
    if (status === AppointmentStatus.ALL) {
      return this.appointments.length;
    }
    return this.appointments.filter((app) => app.appointmentStatus === status)
      .length;
  }

  getStatusColor(status: AppointmentStatus): string {
    const statusColors = {
      [AppointmentStatus.COMPLETED]: 'text-green-600',
      [AppointmentStatus.ATTENDED]: 'text-orange-600',
      [AppointmentStatus.UPCOMING]: 'text-blue-600',
      [AppointmentStatus.MISSED]: 'text-red-600',
      [AppointmentStatus.ALL]: 'text-gray-600',
    };
    return statusColors[status] || statusColors[AppointmentStatus.ALL];
  }

  getStatusClass(status: AppointmentStatus): string {
    const baseClass = 'px-3 py-1 text-sm rounded-full';
    const statusClasses = {
      [AppointmentStatus.COMPLETED]: `${baseClass} text-green-600 bg-green-100`,
      [AppointmentStatus.ATTENDED]: `${baseClass} text-orange-600 bg-orange-100`,
      [AppointmentStatus.UPCOMING]: `${baseClass} text-blue-600 bg-blue-100`,
      [AppointmentStatus.MISSED]: `${baseClass} text-red-600 bg-red-100`,
      [AppointmentStatus.ALL]: `${baseClass} text-gray-600 bg-gray-100`,
    };
    return statusClasses[status] || statusClasses[AppointmentStatus.ALL];
  }

  onAppointmentClick(appointment: AppointmentResponseDto): void {
    this.selectedAppointment = appointment;
  }

  closeAppointmentView(): void {
    this.selectedAppointment = null;
    this.loadAppointments();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}