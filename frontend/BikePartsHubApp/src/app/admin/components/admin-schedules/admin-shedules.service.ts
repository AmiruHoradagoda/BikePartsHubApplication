import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';

export enum AppointmentStatus {
  COMPLETED = 'COMPLETED',
  ATTENDED = 'ATTENDED',
  UPCOMING = 'UPCOMING',
  MISSED = 'MISSED',
  ALL = 'ALL',
}

export interface ServiceTypeDto {
  serviceName: string;
  serviceDuration: number;
  serviceCost: number;
  description: string;
  features: string[];
}

export interface AppointmentResponseDto {
  id: number;
  customerName: string;
  mobile: string;
  startDate: string;
  startTime: string;
  serviceDuration: number;
  plateNumber: string;
  engineOil: string;
  engineOilCost: number;
  totalCharge: number;
  serviceTypeDto: ServiceTypeDto;
  appointmentStatus: AppointmentStatus;
}

interface PaginatedAppointmentResponseDto {
  appointmentResponseDto: Set<AppointmentResponseDto>;
  dataCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminSchedulesService {
  private baseUrl = environment.apiUrl + '/api/v1/admin';

  constructor(
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  getAllAppointmentDetails(
    page: number,
    size: number
  ): Observable<PaginatedAppointmentResponseDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedAppointmentResponseDto>(
      `${this.baseUrl}/getAllAppointmentDetails`,
      { params, headers: this.adminAuthService.getAuthHeader() }
    );
  }
  updateAppointmentStatus(
    id: number,
    status: AppointmentStatus
  ): Observable<string> {
    // Exclude the 'ALL' status as it's not a valid status for an appointment
    if (status === AppointmentStatus.ALL) {
      return throwError(
        () => new Error('Cannot set appointment status to ALL')
      );
    }

    // Create query parameters matching the backend endpoint
    const params = new HttpParams()
      .set('appointmentId', id.toString())
      .set('status', status);

    // Make the PUT request to update the appointment status with query parameters
    return this.http
      .put<string>(
        `${this.baseUrl}/changeAppointmentStatus`,
        null, // No request body needed as we're using query parameters
        {
          params,
          headers: this.adminAuthService.getAuthHeader(),
          responseType: 'text' as 'json', // The backend returns a string message
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating appointment status:', error);
          return throwError(
            () =>
              new Error(`Failed to update appointment status: ${error.message}`)
          );
        })
      );
  }
}
