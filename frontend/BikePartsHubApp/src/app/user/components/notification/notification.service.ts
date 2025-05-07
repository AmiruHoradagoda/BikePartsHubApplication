import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface NotificationMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationMessage>();
  public notification$: Observable<NotificationMessage> =
    this.notificationSubject.asObservable();

  constructor() {}

  showSuccess(message: string, duration: number = 3000): void {
    this.notify({
      message,
      type: 'success',
      duration,
    });
  }

  showError(message: string, duration: number = 5000): void {
    this.notify({
      message,
      type: 'error',
      duration,
    });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.notify({
      message,
      type: 'info',
      duration,
    });
  }

  showWarning(message: string, duration: number = 4000): void {
    this.notify({
      message,
      type: 'warning',
      duration,
    });
  }

  private notify(notification: NotificationMessage): void {
    this.notificationSubject.next(notification);
  }
}
