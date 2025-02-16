import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private API_URL = `${environment.apiUrl}/api/v1/order`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  async saveOrder(orderData: any): Promise<any> {
    try {
      const headers = this.authService.getAuthHeader();

      if (!headers.get('Authorization')) {
        throw new Error('No authentication token found');
      }

      // Using firstValueFrom to convert Observable to Promise
      return await firstValueFrom(
        this.http.post(`${this.API_URL}/save`, orderData, { headers })
      );
    } catch (error: any) {
      // If token is expired, try to refresh and retry
      if (error.status === 403) {
        try {
          await firstValueFrom(this.authService.refreshToken());
          const newHeaders = this.authService.getAuthHeader();
          return await firstValueFrom(
            this.http.post(`${this.API_URL}/save`, orderData, {
              headers: newHeaders,
            })
          );
        } catch (refreshError) {
          throw new Error('Session expired. Please login again.');
        }
      }
      throw error;
    }
  }
}