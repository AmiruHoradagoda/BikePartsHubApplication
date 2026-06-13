// schedules-view.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AppointmentResponseDto,
  AppointmentStatus,
} from '../../../admin-customers.service';

@Component({
  selector: 'app-schedules-view',
  templateUrl: './schedules-view.component.html',
})
export class SchedulesViewComponent {
  @Input() appointment!: AppointmentResponseDto;
  @Output() close = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<AppointmentStatus>();
  AppointmentStatus = AppointmentStatus;
  getProgressWidth(): string {
    switch (this.appointment.appointmentStatus) {
      case AppointmentStatus.COMPLETED:
        return '100%';
      case AppointmentStatus.ATTENDED:
        return '66%';
      case AppointmentStatus.UPCOMING:
        return '33%';
      case AppointmentStatus.MISSED:
        return '0%';
      default:
        return '0%';
    }
  }

  onBackClick() {
    this.close.emit();
  }

  getNextStatus(): AppointmentStatus | null {
    switch (this.appointment.appointmentStatus) {
      case AppointmentStatus.UPCOMING:
        return AppointmentStatus.ATTENDED;
      case AppointmentStatus.ATTENDED:
        return AppointmentStatus.COMPLETED;
      default:
        return null;
    }
  }

  onApplyChanges() {
    const nextStatus = this.getNextStatus();
    if (nextStatus) {
      this.statusChange.emit(nextStatus);
    }
  }

  canMarkMissed(): boolean {
    return this.appointment.appointmentStatus === AppointmentStatus.UPCOMING;
  }

  onMarkMissed() {
    if (this.canMarkMissed()) {
      this.statusChange.emit(AppointmentStatus.MISSED);
    }
  }
}
