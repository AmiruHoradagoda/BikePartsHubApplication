import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ServiceType } from '../../../user/pages/appintment-page/appointment.service';

@Injectable({
  providedIn: 'root',
})
export class AdminServicesService {
  private apiUrl = `${environment.apiUrl}/api/v1/services`;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(this.apiUrl);
  }

  getServiceById(id: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`${this.apiUrl}/${id}`);
  }

  createService(service: ServiceType): Observable<ServiceType> {
    return this.http.post<ServiceType>(this.apiUrl, service);
  }

  updateService(id: number, service: ServiceType): Observable<ServiceType> {
    return this.http.put<ServiceType>(`${this.apiUrl}/${id}`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
