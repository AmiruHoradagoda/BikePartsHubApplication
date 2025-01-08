import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  private baseUrl = `${environment.apiUrl}/api/v1/admin`; // Base URL for the API

  constructor(private http: HttpClient) {}

  /**
   * Fetch all orders with optional status, page, and size parameters.
   * @param orderStatus Optional order status filter.
   * @param page Page number for pagination.
   * @param size Number of items per page.
   * @returns Observable containing paginated order data.
   */
  getAllOrderDetails(
    orderStatus?: string | null,
    page: number = 0,
    size: number = 9
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (orderStatus) {
      params = params.set('orderStatus', orderStatus);
    }

    return this.http.get(`${this.baseUrl}/getAllOrderDetails`, { params });
  }
}
