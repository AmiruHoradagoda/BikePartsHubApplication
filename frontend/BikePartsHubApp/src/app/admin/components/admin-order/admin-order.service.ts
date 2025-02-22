import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { OrderResponses } from './order.models';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  private baseUrl = `${environment.apiUrl}/api/v1/admin`; // Base URL for the API

  constructor(private http: HttpClient,  private adminAuthService: AdminAuthService) {}

  getAllOrderDetails(
    orderStatus?: string | null,
    page: number = 0,
    size: number = 9
  ): Observable<OrderResponses> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (orderStatus) {
      params = params.set('orderStatus', orderStatus);
    }

    return this.http.get<OrderResponses>(`${this.baseUrl}/getAllOrderDetails`, {
      params, headers: this.adminAuthService.getAuthHeader()
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<string> {
    const params = new HttpParams()
      .set('orderId', orderId.toString())
      .set('status', status);

    return this.http.put<string>(`${this.baseUrl}/changeOrderStatus`, null, {
      params,
      headers: this.adminAuthService.getAuthHeader(),
    });
  }
}
