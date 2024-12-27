import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceType } from '../../core/models/interface/ServiceType';
import { Appointment } from '../../core/models/interface/Appointment';


export interface TimeSlotStatus {
  slot: string;
  status: 'available' | 'busy' | 'highly-busy' | 'not-available';
  bookedCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly API_URL = 'http://localhost:8080/api/v1/appointment';

  constructor(private http: HttpClient) {}

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

  createAppointment(
    appointment: Omit<Appointment, 'id'>
  ): Observable<Appointment> {
    return this.http.post<Appointment>(
      `${this.API_URL}/appointments`,
      appointment
    );
  }
}