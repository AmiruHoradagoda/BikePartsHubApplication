import { Component, Input, OnInit } from '@angular/core';
import { AdminCustomersService, AppointmentResponseDto, AppointmentStatus } from '../../admin-customers.service';




@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent implements OnInit {
  @Input() userId!: string;

  AppointmentStatus = AppointmentStatus;
  appointments: AppointmentResponseDto[] = [];
  filteredAppointments: AppointmentResponseDto[] = [];
  loading = false;
  error: string | null = null;
  currentStatus = AppointmentStatus.ALL;
  selectedAppointment: AppointmentResponseDto | null = null;

  readonly STATUSES = [
    { value: AppointmentStatus.COMPLETED, label: 'Completed' },
    { value: AppointmentStatus.ATTENDED, label: 'Attended' },
    { value: AppointmentStatus.UPCOMING, label: 'Upcoming' },
    { value: AppointmentStatus.MISSED, label: 'Missed' },
  ];

  constructor(private adminCustomersService: AdminCustomersService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loading = true;
    this.adminCustomersService
      .getCustomerAppointments(parseInt(this.userId))
      .subscribe({
        next: (appointments) => {
          this.appointments = appointments;
          this.applyFilter();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load appointments';
          this.loading = false;
          console.error('Error loading appointments:', error);
        },
      });
  }

  applyFilter() {
    this.filteredAppointments =
      this.currentStatus === AppointmentStatus.ALL
        ? [...this.appointments]
        : this.appointments.filter(
            (app) => app.appointmentStatus === this.currentStatus
          );
  }

  filterByStatus(status: AppointmentStatus) {
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
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return 'text-green-600';
      case AppointmentStatus.ATTENDED:
        return 'text-orange-600';
      case AppointmentStatus.UPCOMING:
        return 'text-blue-600';
      case AppointmentStatus.MISSED:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  getStatusClass(status: AppointmentStatus): string {
    const baseClass = 'px-3 py-1 text-sm rounded-full';
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return `${baseClass} text-green-600 bg-green-100`;
      case AppointmentStatus.ATTENDED:
        return `${baseClass} text-orange-600 bg-orange-100`;
      case AppointmentStatus.UPCOMING:
        return `${baseClass} text-blue-600 bg-blue-100`;
      case AppointmentStatus.MISSED:
        return `${baseClass} text-red-600 bg-red-100`;
      default:
        return `${baseClass} text-gray-600 bg-gray-100`;
    }
  }

  onAppointmentClick(appointment: AppointmentResponseDto) {
    this.selectedAppointment = appointment;
  }

  closeAppointmentView() {
    this.selectedAppointment = null;
    this.loadAppointments();
  }

  onBack() {
    // Implement back navigation
  }

  generateReport() {
    // Implement report generation
  }

  getTotalAppointments(): number {
    return this.appointments.length;
  }
}