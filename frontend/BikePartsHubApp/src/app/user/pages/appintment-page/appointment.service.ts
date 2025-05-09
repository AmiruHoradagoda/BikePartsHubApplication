import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';



export interface TimeSlotStatus {
  slot: string;
  status: 'available' | 'busy' | 'highly-busy' | 'not-available';
  bookedCount: number;
}
export interface ServiceType {
  id: number;
  serviceName: string;
  serviceDuration: number;
  serviceCost: number;
  description: string;
  features: string[];
}
export interface Appointment {
  id?: number;
  customerName: string;
  mobile: string;
  plateNumber: string;
  startDate: string;
  startTime: string;
  engineOil: string;
  engineOilCost: number;
  totalCharge: number;
  appointmentStatus: AppointmentStatus;
  serviceType: ServiceType;
  user?: any; // Replace with proper User interface if available
}
export enum AppointmentStatus {
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
  ATTENDED = 'ATTENDED',
  MISSED = 'MISSED',
}
export interface AppointmentSaveRequest {
  customerName: string;
  mobile: string;
  startDate: string;
  startTime: string;
  plateNumber: string;
  engineOil: string;
  engineOilCost: number;
  totalCharge: number;
  serviceTypeId: number;
  appointmentStatus: AppointmentStatus;
  userId: number;
}
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly API_URL = 'https://bikepartshub.altero.dev/api/v1/appointment';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllServices(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(`${this.API_URL}/services`);
  }

  getServiceById(id: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`${this.API_URL}/services/${id}`);
  }

  getAppointmentsByDate(date: string): Observable<Appointment[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<Appointment[]>(`${this.API_URL}/appointments`, {
      params,
    });
  }

  getAvailableTimeSlots(date: string, duration: number): Observable<string[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('duration', duration.toString());
    return this.http.get<string[]>(`${this.API_URL}/time-slots`, { params });
  }

  createAppointment(appointment: AppointmentSaveRequest): Observable<void> {
    const createRequest = () => {
      return this.http.post<void>(`${this.API_URL}/appointments`, appointment, {
        headers: this.authService.getAuthHeader(),
      });
    };

    return createRequest().pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => createRequest()),
            catchError((refreshError) => {
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
