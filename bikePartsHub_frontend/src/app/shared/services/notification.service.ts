import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

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

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, duration: number = 3000): void {
    this.notify({ message, type: 'success', duration });
  }

  showError(message: string, duration: number = 5000): void {
    this.notify({ message, type: 'error', duration });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.notify({ message, type: 'info', duration });
  }

  showWarning(message: string, duration: number = 4000): void {
    this.notify({ message, type: 'warning', duration });
  }

  private notify(notification: NotificationMessage): void {
    this.notificationSubject.next(notification);

    const options: Partial<IndividualConfig> = {
      progressBar: true,
      timeOut: notification.duration,
    };

    switch (notification.type) {
      case 'success':
        this.toastr.success(notification.message, 'Success', options);
        break;
      case 'error':
        this.toastr.error(notification.message, 'Error', options);
        break;
      case 'warning':
        this.toastr.warning(notification.message, 'Warning', options);
        break;
      default:
        this.toastr.info(notification.message, 'Info', options);
        break;
    }
  }
}
