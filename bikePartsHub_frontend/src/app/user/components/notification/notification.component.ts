import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationMessage, NotificationService } from './notification.service';


@Component({
  selector: 'app-notification',
  template: `
    <div
      *ngIf="visible"
      class="fixed top-4 right-4 z-50 rounded-lg shadow-lg p-4 flex items-center transition-all duration-300"
      [ngClass]="{
        'bg-green-100 border-l-4 border-green-500 text-green-700':
          currentNotification?.type === 'success',
        'bg-red-100 border-l-4 border-red-500 text-red-700':
          currentNotification?.type === 'error',
        'bg-blue-100 border-l-4 border-blue-500 text-blue-700':
          currentNotification?.type === 'info',
        'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700':
          currentNotification?.type === 'warning'
      }"
    >
      <div *ngIf="currentNotification?.type === 'success'" class="mr-3">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div *ngIf="currentNotification?.type === 'error'" class="mr-3">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div *ngIf="currentNotification?.type === 'info'" class="mr-3">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div *ngIf="currentNotification?.type === 'warning'" class="mr-3">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p>{{ currentNotification?.message }}</p>
      <button
        (click)="closeNotification()"
        class="ml-3 text-gray-400 hover:text-gray-600"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [],
})
export class NotificationComponent implements OnInit, OnDestroy {
  visible = false;
  currentNotification: NotificationMessage | null = null;
  private timeout: any;
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notification$.subscribe(
      (notification) => {
        this.showNotification(notification);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private showNotification(notification: NotificationMessage): void {
    // Clear any existing timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Set the new notification
    this.currentNotification = notification;
    this.visible = true;

    // Set timeout to hide notification
    if (notification.duration) {
      this.timeout = setTimeout(() => {
        this.closeNotification();
      }, notification.duration);
    }
  }

  closeNotification(): void {
    this.visible = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
