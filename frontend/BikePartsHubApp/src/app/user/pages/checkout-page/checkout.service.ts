import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/api/v1/order`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  saveOrder(orderData: any): Promise<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );

    return this.http
      .post(`${this.apiUrl}/save`, orderData, { headers })
      .toPromise()
      .then((response) => {
        if (!response) {
          throw new Error('No response from server');
        }
        return response;
      })
      .catch((error) => {
        if (error.status === 401) {
          return this.authService
            .refreshToken()
            .toPromise()
            .then(() => this.saveOrder(orderData));
        }
        throw error;
      });
  }
}
