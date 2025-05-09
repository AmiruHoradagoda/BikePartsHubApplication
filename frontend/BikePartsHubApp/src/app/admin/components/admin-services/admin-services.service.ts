import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ServiceType } from '../../../user/pages/appintment-page/appointment.service';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminServicesService {
  private apiUrl = `${environment.apiUrl}/api/v1/services`;

  constructor(
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  getAllServices(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(this.apiUrl, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }

  getServiceById(id: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`${this.apiUrl}/${id}`, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }

  createService(service: ServiceType): Observable<ServiceType> {
    return this.http.post<ServiceType>(this.apiUrl, service, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }

  updateService(id: number, service: ServiceType): Observable<ServiceType> {
    return this.http.put<ServiceType>(`${this.apiUrl}/${id}`, service, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }
}
