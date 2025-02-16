import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/api/v1/order`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  async saveOrder(orderData: any): Promise<any> {
    try {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('user_access_token')}`
      );

      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/save`, orderData, { headers })
      );

      if (!response) {
        throw new Error('No response from server');
      }
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        await firstValueFrom(this.authService.refreshToken());
        return this.saveOrder(orderData);
      }
      throw error;
    }
  }
}
