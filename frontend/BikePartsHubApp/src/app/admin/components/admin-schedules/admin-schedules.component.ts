import { Component, OnInit } from '@angular/core';

interface Appointment {
  id: string;
  timeSlot: string;
  date: string;
  service: string;
  status: 'completed' | 'upcoming' | 'missed' | 'attended';
}

@Component({
  selector: 'app-admin-schedules',
  templateUrl: './admin-schedules.component.html',
  styleUrls: ['./admin-schedules.component.css'],
})
export class AdminSchedulesComponent implements OnInit {
  // Appointments data
  allAppointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  // Filters and sorting
  currentFilter: 'all' | 'completed' | 'upcoming' | 'missed' | 'attended' =
    'all';
  showSortDropdown: boolean = false;
  currentSortField: 'date' | 'time' = 'date';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.loadAppointments();
    this.filterAppointments('all');
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
    // In a real application, this would be an API call
    this.allAppointments = [
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'completed',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'attended',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'attended',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'completed',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'missed',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'missed',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '20/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '21/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '21/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '21/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '22/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '10.30 - 12.30',
        date: '22/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '10.30 - 12.30',
        date: '22/01/2025',
        service: 'Full service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '12.30 - 14.30',
        date: '23/01/2025',
        service: 'Oil change',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '14.30 - 16.30',
        date: '23/01/2025',
        service: 'Oil change',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '16.30 - 18.30',
        date: '24/01/2025',
        service: 'Tire change',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '8.30 - 10.30',
        date: '24/01/2025',
        service: 'Tire change',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '10.30 - 12.30',
        date: '25/01/2025',
        service: 'Brake service',
        status: 'upcoming',
      },
      {
        id: '#01470523',
        timeSlot: '12.30 - 14.30',
        date: '25/01/2025',
        service: 'Brake service',
        status: 'upcoming',
      },
    ];

    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(
      this.filteredAppointments.length / this.pageSize
    );
  }

  filterAppointments(
    filter: 'all' | 'completed' | 'upcoming' | 'missed' | 'attended'
  ): void {
    this.currentFilter = filter;
    this.currentPage = 1;

    if (filter === 'all') {
      this.filteredAppointments = [...this.allAppointments];
    } else {
      this.filteredAppointments = this.allAppointments.filter(
        (appointment) => appointment.status === filter
      );
    }

    this.applySorting();
    this.calculateTotalPages();
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
        // Convert DD/MM/YYYY to sortable format
        const dateA = this.convertDateStringToComparable(a.date);
        const dateB = this.convertDateStringToComparable(b.date);
        comparison = dateA - dateB;
      } else if (this.currentSortField === 'time') {
        // Extract the start time for comparison
        const timeA = this.extractStartTime(a.timeSlot);
        const timeB = this.extractStartTime(b.timeSlot);
        comparison = timeA - timeB;
      }

      // Apply sort direction
      return this.currentSortDirection === 'asc' ? comparison : -comparison;
    });
  }

  convertDateStringToComparable(dateString: string): number {
    // Convert DD/MM/YYYY to YYYY-MM-DD for proper comparison
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`).getTime();
  }

  extractStartTime(timeSlot: string): number {
    // Extract the start time (e.g., from "8.30 - 10.30" get 8.30)
    const startTimeString = timeSlot.split('-')[0].trim();
    // Convert "8.30" to minutes (8*60 + 30 = 510 minutes)
    const [hours, minutes] = startTimeString.split('.');
    return parseInt(hours) * 60 + parseInt(minutes || '0');
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];

    // Show up to 5 page numbers centered around current page
    let startPage = Math.max(2, this.currentPage - 2);
    let endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    // Adjust if we're near the beginning or end
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
}
