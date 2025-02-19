import { Component, OnInit } from '@angular/core';

interface Message {
  id: number;
  sender: string;
  time: string;
  date: string;
  content: string;
  isRead: boolean;
  isStarred: boolean;
}

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css'],
})
export class AdminMessagesComponent implements OnInit {
  // Messages data
  allMessages: Message[] = [];
  filteredMessages: Message[] = [];

  // Filters and sorting
  currentFilter: 'all' | 'read' | 'new' | 'starred' = 'all';
  showSortDropdown: boolean = false;
  currentSortField: 'date' | 'sender' = 'date';
  currentSortDirection: 'asc' | 'desc' = 'desc';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.loadMessages();
    this.filterMessages('all');
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

  loadMessages(): void {
    // In a real application, this would be an API call
    this.allMessages = [
      {
        id: 1,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'Full servicgfiuedygfiuewfuiofuehfoiuehaofiiu',
        isRead: true,
        isStarred: false,
      },
      {
        id: 2,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'vbsadjyvehjtdvhewfjbkuewfoefbhejbfkebwf',
        isRead: true,
        isStarred: false,
      },
      {
        id: 3,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'bhcdbhjdsbchjdscgfcyhgdsufychbjuwyhbuw',
        isRead: false,
        isStarred: false,
      },
      {
        id: 4,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'dyhfebjdhcbejduefabuysdofbuwfnbkjuankiujf',
        isRead: false,
        isStarred: false,
      },
      {
        id: 5,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'bjkcbkasjdbcfjksdcncfbjsnsfjtsdfjnjkasfnchjkjs',
        isRead: true,
        isStarred: true,
      },
      {
        id: 6,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'jhdcharsfdbrjcjtbsthfjcbdsjcjhgfbubndcqw hj',
        isRead: false,
        isStarred: false,
      },
      {
        id: 7,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'gyjhfbedsuyefbiuacyeufidhiufbiuA',
        isRead: true,
        isStarred: true,
      },
      {
        id: 8,
        sender: 'Amiru Miththa',
        time: '8.30',
        date: '20/01/2025',
        content: 'BJHDYCBVSAJUVGFBUVASGUVAJGFDB',
        isRead: false,
        isStarred: false,
      },
      // Add more messages to fill out pagination
      {
        id: 9,
        sender: 'Amiru Miththa',
        time: '9.30',
        date: '21/01/2025',
        content: 'Meeting scheduled for next week',
        isRead: true,
        isStarred: false,
      },
      {
        id: 10,
        sender: 'Amiru Miththa',
        time: '10.30',
        date: '21/01/2025',
        content: 'Please review the latest inventory report',
        isRead: false,
        isStarred: false,
      },
      {
        id: 11,
        sender: 'Amiru Miththa',
        time: '11.30',
        date: '21/01/2025',
        content: 'Customer feedback on the new products',
        isRead: true,
        isStarred: false,
      },
      {
        id: 12,
        sender: 'Amiru Miththa',
        time: '12.30',
        date: '22/01/2025',
        content: 'Update on the website maintenance',
        isRead: false,
        isStarred: false,
      },
      {
        id: 13,
        sender: 'Amiru Miththa',
        time: '13.30',
        date: '22/01/2025',
        content: 'Staff training session tomorrow',
        isRead: true,
        isStarred: false,
      },
      {
        id: 14,
        sender: 'Amiru Miththa',
        time: '14.30',
        date: '22/01/2025',
        content: 'Quarterly sales performance report',
        isRead: false,
        isStarred: false,
      },
      {
        id: 15,
        sender: 'Amiru Miththa',
        time: '15.30',
        date: '23/01/2025',
        content: 'New supplier contract proposal',
        isRead: true,
        isStarred: false,
      },
      {
        id: 16,
        sender: 'Amiru Miththa',
        time: '16.30',
        date: '23/01/2025',
        content: 'Marketing campaign results',
        isRead: false,
        isStarred: false,
      },
      {
        id: 17,
        sender: 'Amiru Miththa',
        time: '17.30',
        date: '24/01/2025',
        content: 'System maintenance notification',
        isRead: true,
        isStarred: false,
      },
      {
        id: 18,
        sender: 'Amiru Miththa',
        time: '18.30',
        date: '24/01/2025',
        content: 'Upcoming holiday schedule',
        isRead: false,
        isStarred: false,
      },
      {
        id: 19,
        sender: 'Amiru Miththa',
        time: '19.30',
        date: '25/01/2025',
        content: 'Customer support escalation procedure',
        isRead: true,
        isStarred: false,
      },
      {
        id: 20,
        sender: 'Amiru Miththa',
        time: '20.30',
        date: '25/01/2025',
        content: 'Invoice processing update',
        isRead: false,
        isStarred: false,
      },
    ];

    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredMessages.length / this.pageSize);
  }

  filterMessages(filter: 'all' | 'read' | 'new' | 'starred'): void {
    this.currentFilter = filter;
    this.currentPage = 1;

    switch (filter) {
      case 'all':
        this.filteredMessages = [...this.allMessages];
        break;
      case 'read':
        this.filteredMessages = this.allMessages.filter(
          (message) => message.isRead
        );
        break;
      case 'new':
        this.filteredMessages = this.allMessages.filter(
          (message) => !message.isRead
        );
        break;
      case 'starred':
        this.filteredMessages = this.allMessages.filter(
          (message) => message.isStarred
        );
        break;
    }

    this.applySorting();
    this.calculateTotalPages();
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  sortMessages(field: 'date' | 'sender', direction: 'asc' | 'desc'): void {
    this.currentSortField = field;
    this.currentSortDirection = direction;
    this.showSortDropdown = false;

    this.applySorting();
  }

  applySorting(): void {
    this.filteredMessages.sort((a, b) => {
      let comparison = 0;

      if (this.currentSortField === 'date') {
        // Convert DD/MM/YYYY to sortable format
        const dateA = this.convertDateStringToComparable(a.date);
        const dateB = this.convertDateStringToComparable(b.date);

        if (dateA === dateB) {
          // If dates are equal, sort by time
          const timeA = this.convertTimeToMinutes(a.time);
          const timeB = this.convertTimeToMinutes(b.time);
          comparison = timeA - timeB;
        } else {
          comparison = dateA - dateB;
        }
      } else if (this.currentSortField === 'sender') {
        comparison = a.sender.localeCompare(b.sender);
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

  convertTimeToMinutes(timeString: string): number {
    // Convert "8.30" to minutes (8*60 + 30 = 510 minutes)
    const [hours, minutes] = timeString.split('.');
    return parseInt(hours) * 60 + parseInt(minutes || '0');
  }

  toggleStarMessage(message: Message): void {
    message.isStarred = !message.isStarred;
    // In a real application, this would update the server
  }

  deleteMessage(message: Message): void {
    // In a real application, this would be an API call before removing locally
    this.allMessages = this.allMessages.filter((m) => m.id !== message.id);
    this.filterMessages(this.currentFilter);
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
