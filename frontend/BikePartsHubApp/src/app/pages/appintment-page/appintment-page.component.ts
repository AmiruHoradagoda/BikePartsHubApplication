import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

interface ServiceType {
  id: number;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface Appointment {
  id: string;
  serviceDuration: number;
  date: string;
  startTime: string;
  name: string;
  mobile: string;
  plateNumber: string;
  engineOil: string | undefined;
  totalCharge: number;
}
interface TimeSlotStatus {
  slot: string;
  status: 'available' | 'busy' | 'highly-busy' | 'not-available';
  bookedCount: number;
}
@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    ButtonModule,
  ],
  templateUrl: './appintment-page.component.html',
  styleUrl: './appintment-page.component.css',
})
export class AppointmentPageComponent implements OnInit {
  services: ServiceType[] = [
    {
      id: 1,
      name: '1-Hour Service',
      duration: 1,
      price: 550,
      description: 'Quick maintenance service',
    },
    {
      id: 2,
      name: '2-Hour Service',
      duration: 2,
      price: 2000,
      description: 'Standard maintenance service',
    },
    {
      id: 3,
      name: '3-Hour Service',
      duration: 3,
      price: 3000,
      description: 'Comprehensive maintenance service',
    },
  ];

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

  constructor(private fb: FormBuilder) {
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
  }

  get totalCharge(): number {
    return (this.selectedService?.price || 0) + this.addOnsCharge;
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

    const slots: TimeSlotStatus[] = [];
    const startHour = 8;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of ['00', '30']) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute}`;
        const status = this.getTimeSlotStatus(timeSlot);
        slots.push(status);

        if (
          status.status === 'available' ||
          status.status === 'busy' ||
          status.status === 'highly-busy'
        ) {
          this.availableTimeSlots.push(timeSlot);
        }
      }
    }

    this.timeSlotStatuses = slots;
  }

  getTimeSlotStatus(timeSlot: string): TimeSlotStatus {
    if (!this.selectedDate || !this.selectedService) {
      return { slot: timeSlot, status: 'not-available', bookedCount: 0 };
    }

    const [hours, minutes] = timeSlot.split(':').map(Number);
    const endHour = hours + this.selectedService.duration;

    // Check if the service would extend beyond working hours
    if (endHour > 17) {
      return { slot: timeSlot, status: 'not-available', bookedCount: 0 };
    }

    const dateStr = this.selectedDate.toISOString().split('T')[0];
    const conflictingAppointments = this.appointments.filter(
      (apt) =>
        apt.date === dateStr &&
        this.doTimeSlotsOverlap(
          timeSlot,
          this.selectedService!.duration,
          apt.startTime,
          apt.serviceDuration
        )
    );

    const bookedCount = conflictingAppointments.length;

    if (bookedCount >= 3) {
      return { slot: timeSlot, status: 'not-available', bookedCount };
    } else if (bookedCount === 2) {
      return { slot: timeSlot, status: 'highly-busy', bookedCount };
    } else if (bookedCount === 1) {
      return { slot: timeSlot, status: 'busy', bookedCount };
    } else {
      return { slot: timeSlot, status: 'available', bookedCount };
    }
  }

  getTimeSlotClasses(slot: string): string {
    const status =
      this.timeSlotStatuses.find((s) => s.slot === slot)?.status ||
      'not-available';
    const isSelected = this.selectedTimeSlot === slot;

    const baseClasses = 'p-3 text-center transition-colors rounded-md';

    const statusClasses = {
      available:
        'bg-green-100 hover:bg-green-200 text-green-800 cursor-pointer',
      busy: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 cursor-pointer',
      'highly-busy':
        'bg-orange-100 hover:bg-orange-200 text-orange-800 cursor-pointer',
      'not-available':
        'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50',
    };

    const selectedClasses = isSelected
      ? 'ring-2 ring-blue-500 ring-offset-2'
      : '';

    return `${baseClasses} ${statusClasses[status]} ${selectedClasses}`;
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
    this.addOnsCharge = 2000;
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

  isTimeSlotAvailable(timeSlot: string): boolean {
    const status = this.timeSlotStatuses.find(
      (s) => s.slot === timeSlot
    )?.status;
    return status !== 'not-available';
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

  getOilSelectionClasses(oil: string): string {
    return `p-4 border rounded cursor-pointer text-center
           ${
             this.selectedOil === oil
               ? 'border-blue-500 bg-blue-50'
               : 'hover:border-blue-300'
           }`;
  }

  backToServices() {
    this.selectedService = null;
    this.selectedDate = null;
    this.selectedTimeSlot = null;
    this.selectedOil = undefined;
    this.bookingForm.reset();
    this.addOnsCharge = 0;
  }

  submitBooking() {
    if (this.isFormValid() && this.selectedService) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        serviceDuration: this.selectedService.duration,
        date: this.selectedDate!.toISOString().split('T')[0],
        startTime: this.selectedTimeSlot!,
        name: this.bookingForm.value.name,
        mobile: this.bookingForm.value.mobile,
        plateNumber: this.bookingForm.value.plateNumber,
        engineOil: this.selectedOil,
        totalCharge: this.totalCharge,
      };

      this.appointments.push(appointment);
      console.log('New appointment booked:', appointment);
      console.log('All appointments:', this.appointments);
      this.backToServices();
    }
  }

  isFormValid(): boolean {
    return (
      this.bookingForm.valid &&
      !!this.selectedDate &&
      !!this.selectedTimeSlot &&
      !!this.selectedOil
    );
  }
}