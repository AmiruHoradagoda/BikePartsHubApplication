import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';

export enum AppointmentStatus {
  COMPLETED = 'COMPLETED',
  ATTENDED = 'ATTENDED',
  UPCOMING = 'UPCOMING',
  MISSED = 'MISSED',
  ALL = 'ALL',
}

export interface AppointmentResponseDto {
  name: string;
  mobile: string;
  date: string;
  startTime: string;
  serviceDuration: number;
  plateNumber: string;
  engineOil: string;
  engineOilCost: number;
  totalCharge: number;
  serviceTypeDto: any;
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
}
