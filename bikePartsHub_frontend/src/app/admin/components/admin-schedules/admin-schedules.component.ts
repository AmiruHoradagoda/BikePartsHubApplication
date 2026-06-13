import { Component, OnInit } from '@angular/core';
import {
  AdminSchedulesService,
  AppointmentStatus,
  AppointmentResponseDto,
} from './admin-shedules.service';

@Component({
  selector: 'app-admin-schedules',
  templateUrl: './admin-schedules.component.html',
  styleUrls: ['./admin-schedules.component.css'],
})
export class AdminSchedulesComponent implements OnInit {
  readonly AppointmentStatus = AppointmentStatus;
  readonly Math = Math; // To use Math in the template

  // Appointments data
  appointments: AppointmentResponseDto[] = [];
  filteredAppointments: AppointmentResponseDto[] = [];
  selectedAppointment: AppointmentResponseDto | null = null;

  // Filters and sorting
  currentFilter: AppointmentStatus = AppointmentStatus.ALL;
  showSortDropdown: boolean = false;
  currentSortField: 'date' | 'time' = 'date';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 1;

  constructor(private adminSchedulesService: AdminSchedulesService) {}

  ngOnInit(): void {
    this.loadAppointments();
    document.addEventListener(
      'click',
      this.closeDropdownOnOutsideClick.bind(this)
    );
  }

  ngOnDestroy(): void {
    document.removeEventListener(
      'click',
      this.closeDropdownOnOutsideClick.bind(this)
    );
  }

  closeDropdownOnOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.sort-dropdown-container')) {
      this.showSortDropdown = false;
    }
  }

  loadAppointments(): void {
    this.adminSchedulesService
      .getAllAppointmentDetails(this.currentPage - 1, this.pageSize)
      .subscribe({
        next: (response) => {
          this.appointments = Array.from(response.appointmentResponseDto);
          this.totalItems = response.dataCount;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.filterAppointments(this.currentFilter);
        },
        error: (error) => {
          console.error('Error loading appointments:', error);
        },
      });
  }

  filterAppointments(filter: AppointmentStatus): void {
    this.currentFilter = filter;
    this.currentPage = 1;

    if (filter === AppointmentStatus.ALL) {
      this.filteredAppointments = [...this.appointments];
    } else {
      this.filteredAppointments = this.appointments.filter(
        (appointment) => appointment.appointmentStatus === filter
      );
    }

    this.applySorting();
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  sortAppointments(field: 'date' | 'time', direction: 'asc' | 'desc'): void {
    this.currentSortField = field;
    this.currentSortDirection = direction;
    this.showSortDropdown = false;

    this.applySorting();
  }

  applySorting(): void {
    this.filteredAppointments.sort((a, b) => {
      let comparison = 0;

      if (this.currentSortField === 'date') {
        comparison =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      } else if (this.currentSortField === 'time') {
        comparison = this.compareTime(a.startTime, b.startTime);
      }

      return this.currentSortDirection === 'asc' ? comparison : -comparison;
    });
  }

  compareTime(timeA: string, timeB: string): number {
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAppointments();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    let startPage = Math.max(2, this.currentPage - 2);
    let endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    if (startPage <= 2) {
      endPage = Math.min(this.totalPages - 1, 5);
    }
    if (endPage >= this.totalPages - 1) {
      startPage = Math.max(2, this.totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // New methods for appointment details view
  viewAppointmentDetails(appointment: AppointmentResponseDto): void {
    this.selectedAppointment = appointment;
  }

  closeAppointmentDetails(): void {
    this.selectedAppointment = null;
  }

  updateAppointmentStatus(event: {
    id: number;
    status: AppointmentStatus;
  }): void {
    this.adminSchedulesService
      .updateAppointmentStatus(event.id, event.status)
      .subscribe({
        next: (response) => {
          // Update the appointment in the list
          const index = this.appointments.findIndex((a) => a.id === event.id);
          if (index !== -1) {
            this.appointments[index].appointmentStatus = event.status;
          }

          // Update the filtered list
          const filteredIndex = this.filteredAppointments.findIndex(
            (a) => a.id === event.id
          );
          if (filteredIndex !== -1) {
            this.filteredAppointments[filteredIndex].appointmentStatus =
              event.status;
          }

          // If we're filtering by status, we may need to remove the item from the filtered list
          if (
            this.currentFilter !== AppointmentStatus.ALL &&
            this.currentFilter !== event.status
          ) {
            this.filteredAppointments = this.filteredAppointments.filter(
              (a) => a.id !== event.id
            );
          }

          // Close the details view
          this.closeAppointmentDetails();
        },
        error: (error) => {
          console.error('Error updating appointment status:', error);
        },
      });
  }
}
