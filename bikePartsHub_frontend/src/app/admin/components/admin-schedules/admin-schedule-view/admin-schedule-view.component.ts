import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentResponseDto, AppointmentStatus } from '../admin-shedules.service';


@Component({
  selector: 'app-admin-schedule-view',
  templateUrl: './admin-schedule-view.component.html',
  styleUrls: ['./admin-schedule-view.component.css'],
})
export class AdminScheduleViewComponent implements OnInit {
  @Input() appointment!: AppointmentResponseDto;
  @Output() close = new EventEmitter<void>();
  @Output() statusUpdate = new EventEmitter<{
    id: number;
    status: AppointmentStatus;
  }>();

  AppointmentStatus = AppointmentStatus;
  currentStatus: AppointmentStatus = AppointmentStatus.UPCOMING;
  isUpdating = false;

  ngOnInit(): void {
    this.currentStatus = this.appointment.appointmentStatus;
  }

  onClose(): void {
    this.close.emit();
  }

  onStatusChange(status: AppointmentStatus): void {
    this.currentStatus = status;
  }

  applyChanges(): void {
    if (this.currentStatus !== this.appointment.appointmentStatus) {
      this.isUpdating = true;

      // Emit event to parent component to handle the status update
      this.statusUpdate.emit({
        id: this.appointment.id,
        status: this.currentStatus,
      });

      // In a real implementation, you'd subscribe to the response and set isUpdating back to false
      // Here we're simulating that the parent component will handle the API call
      setTimeout(() => {
        this.isUpdating = false;
      }, 1000);
    }
  }

  getProgressPercentage(status: AppointmentStatus): number {
    switch (status) {
      case AppointmentStatus.UPCOMING:
        return 0;
      case AppointmentStatus.ATTENDED:
        return 50;
      case AppointmentStatus.COMPLETED:
        return 100;
      case AppointmentStatus.MISSED:
        return 0;
      default:
        return 0;
    }
  }

  getStatusLabel(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.UPCOMING:
        return 'Upcoming';
      case AppointmentStatus.ATTENDED:
        return 'Attended';
      case AppointmentStatus.COMPLETED:
        return 'Completed';
      case AppointmentStatus.MISSED:
        return 'Missed';
      default:
        return status;
    }
  }
}
