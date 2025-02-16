import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { catchError, finalize, of } from 'rxjs';
import { Appointment, AppointmentSaveRequest, AppointmentService, AppointmentStatus, ServiceType, TimeSlotStatus } from './appointment.service';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-appointment-page',
  templateUrl: './appintment-page.component.html',
  styleUrl: './appintment-page.component.css',
})
export class AppointmentPageComponent implements OnInit {
  services: ServiceType[] = [];
  selectedService: ServiceType | null = null;
  bookingForm: FormGroup;
  appointments: Appointment[] = [];
  selectedDate: Date | null = null;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  disabledDates: Date[] = [];
  selectedTimeSlot: string | null = null;
  availableTimeSlots: string[] = [];
  timeSlotStatuses: TimeSlotStatus[] = [];
  engineOils: string[] = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
  selectedOil: string | undefined;
  addOnsCharge: number = 0;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      plateNumber: ['', Validators.required],
    });
    this.initializeCalendar();
  }

  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.generateDisabledDates();
    this.loadServices();
  }

  loadServices() {
    this.loading = true;
    this.appointmentService
      .getAllServices()
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Failed to load services. Please try again later.';
          console.error('Error loading services:', error);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((services) => {
        this.services = services;
      });
  }

  get totalCharge(): number {
    return (this.selectedService?.serviceCost || 0) + this.addOnsCharge;
  }

  initializeCalendar() {
    this.generateDisabledDates();
    this.updateAvailableTimeSlots();
  }

  generateDisabledDates() {
    const holidays = ['2024-12-25', '2024-01-01'];
    this.disabledDates = holidays.map((date) => new Date(date));

    let currentDate = new Date(this.minDate);
    while (currentDate <= this.maxDate) {
      if (currentDate.getDay() === 0) {
        this.disabledDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  updateAvailableTimeSlots() {
    if (!this.selectedDate || !this.selectedService) {
      this.availableTimeSlots = [];
      this.timeSlotStatuses = [];
      return;
    }

    const dateStr = this.selectedDate.toISOString().split('T')[0];
    this.loading = true;

    this.appointmentService
      .getAvailableTimeSlots(dateStr, this.selectedService.serviceDuration)
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Failed to load time slots. Please try again later.';
          console.error('Error loading time slots:', error);
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((timeSlots) => {
        this.availableTimeSlots = timeSlots;
        this.updateTimeSlotStatuses();
      });
  }

  updateTimeSlotStatuses() {
    if (!this.selectedDate || !this.selectedService) {
      this.timeSlotStatuses = [];
      return;
    }

    const dateStr = this.selectedDate.toISOString().split('T')[0];
    this.appointmentService
      .getAppointmentsByDate(dateStr)
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Failed to load appointment status. Please try again later.';
          console.error('Error loading appointment status:', error);
          return of([]);
        })
      )
      .subscribe((appointments) => {
        this.appointments = appointments;
        this.calculateTimeSlotStatuses();
      });
  }

  calculateTimeSlotStatuses() {
    this.timeSlotStatuses = this.availableTimeSlots.map((slot) => {
      const conflictingAppointments = this.appointments.filter((apt) =>
        this.doTimeSlotsOverlap(
          slot,
          this.selectedService!.serviceDuration,
          apt.startTime,
          apt.serviceType.serviceDuration
        )
      );

      const bookedCount = conflictingAppointments.length;

      let status: TimeSlotStatus['status'] = 'available';
      if (bookedCount >= 3) {
        status = 'not-available';
      } else if (bookedCount === 2) {
        status = 'highly-busy';
      } else if (bookedCount === 1) {
        status = 'busy';
      }

      return { slot, status, bookedCount };
    });
  }

  selectService(service: ServiceType) {
    this.selectedService = service;
    this.selectedDate = null;
    this.selectedTimeSlot = null;
    this.selectedOil = undefined;
    this.addOnsCharge = 0;
    this.updateAvailableTimeSlots();
  }

  selectTimeSlot(slot: string) {
    const status = this.timeSlotStatuses.find((s) => s.slot === slot);
    if (status && status.status !== 'not-available') {
      this.selectedTimeSlot = slot;
    }
  }

  selectEngineOil(oil: string) {
    this.selectedOil = oil;
    this.addOnsCharge = 2000; // Fixed charge for engine oil
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.selectedTimeSlot = null;
    this.updateAvailableTimeSlots();
  }

  formatTimeSlot(slot: string): string {
    const [hours, minutes] = slot.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getTimeSlotClasses(slot: string): string {
    const status =
      this.timeSlotStatuses.find((s) => s.slot === slot)?.status ||
      'not-available';
    const isSelected = this.selectedTimeSlot === slot;

    const baseClasses =
      'p-3 rounded-md cursor-pointer transition-colors duration-200';
    const statusClasses = {
      available: 'bg-green-500/20 hover:bg-green-500/30 text-green-300',
      busy: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300',
      'highly-busy': 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300',
      'not-available': 'bg-slate-500/20 text-slate-300 cursor-not-allowed',
    };

    return `${baseClasses} ${statusClasses[status]} ${
      isSelected ? 'ring-2 ring-violet-500' : ''
    }`;
  }

  doTimeSlotsOverlap(
    start1: string,
    duration1: number,
    start2: string,
    duration2: number
  ): boolean {
    const [hour1, minute1] = start1.split(':').map(Number);
    const [hour2, minute2] = start2.split(':').map(Number);

    const startMinutes1 = hour1 * 60 + minute1;
    const endMinutes1 = startMinutes1 + duration1 * 60;
    const startMinutes2 = hour2 * 60 + minute2;
    const endMinutes2 = startMinutes2 + duration2 * 60;

    return startMinutes1 < endMinutes2 && startMinutes2 < endMinutes1;
  }

  backToServices() {
    this.selectedService = null;
    this.selectedDate = null;
    this.selectedTimeSlot = null;
    this.selectedOil = undefined;
    this.bookingForm.reset();
    this.addOnsCharge = 0;
    this.errorMessage = '';
  }
  submitBooking() {
    if (this.isFormValid() && this.selectedService) {
      const appointmentRequest: AppointmentSaveRequest = {
        customerName: this.bookingForm.value.name,
        mobile: this.bookingForm.value.mobile,
        startDate: this.selectedDate!.toISOString().split('T')[0],
        startTime: this.selectedTimeSlot!,
        plateNumber: this.bookingForm.value.plateNumber,
        engineOil: this.selectedOil!,
        engineOilCost: this.addOnsCharge,
        totalCharge: this.totalCharge,
        serviceTypeId: this.selectedService.id,
        appointmentStatus: AppointmentStatus.UPCOMING,
        userId: this.authService.getCurrentUserId(),
      };

      this.loading = true;
      this.appointmentService
        .createAppointment(appointmentRequest)
        .pipe(
          catchError((error) => {
            this.errorMessage =
              'Failed to create appointment. Please try again later.';
            console.error('Error creating appointment:', error);
            return of(null);
          }),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Appointment booked successfully!',
            });
            this.backToServices();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: this.errorMessage,
            });
          },
        });
    }
  }

  isFormValid(): boolean {
    return (
      this.bookingForm.valid &&
      !!this.selectedDate &&
      !!this.selectedTimeSlot &&
      !!this.selectedOil &&
      !!this.selectedService
    );
  }
}