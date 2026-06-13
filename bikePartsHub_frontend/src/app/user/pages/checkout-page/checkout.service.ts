import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PaypalCreatePaymentRequest {
  total: number;
  currency: string;
  description: string;
  cancelUrl: string;
  successUrl: string;
}

export interface PaypalCreatePaymentResponse {
  paymentId: string;
  state: string;
  approvalUrl: string;
}

export interface PaypalExecutePaymentRequest {
  paymentId: string;
  payerId: string;
}

export interface PaypalExecutePaymentResponse {
  paymentId: string;
  state: string;
  payerStatus?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private API_URL = `${environment.apiUrl}/api/v1/order`;
  private PAYPAL_API_URL = `${environment.apiUrl}/api/v1/paypal`;
  private readonly PENDING_PAYPAL_ORDER_KEY = 'pendingPaypalOrder';

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

  async createPaypalPayment(
    request: PaypalCreatePaymentRequest
  ): Promise<PaypalCreatePaymentResponse> {
    return this.sendAuthenticatedRequest<PaypalCreatePaymentResponse>(() =>
      this.http.post<PaypalCreatePaymentResponse>(
        `${this.PAYPAL_API_URL}/create-payment`,
        request,
        { headers: this.authService.getAuthHeader() }
      )
    );
  }

  async executePaypalPayment(
    request: PaypalExecutePaymentRequest
  ): Promise<PaypalExecutePaymentResponse> {
    return this.sendAuthenticatedRequest<PaypalExecutePaymentResponse>(() =>
      this.http.post<PaypalExecutePaymentResponse>(
        `${this.PAYPAL_API_URL}/execute-payment`,
        request,
        { headers: this.authService.getAuthHeader() }
      )
    );
  }

  storePendingPaypalOrder(orderData: any): void {
    localStorage.setItem(
      this.PENDING_PAYPAL_ORDER_KEY,
      JSON.stringify(orderData)
    );
  }

  getPendingPaypalOrder(): any | null {
    const pendingOrder = localStorage.getItem(this.PENDING_PAYPAL_ORDER_KEY);
    return pendingOrder ? JSON.parse(pendingOrder) : null;
  }

  clearPendingPaypalOrder(): void {
    localStorage.removeItem(this.PENDING_PAYPAL_ORDER_KEY);
  }

  private async sendAuthenticatedRequest<T>(requestFactory: () => any): Promise<T> {
    try {
      return await firstValueFrom(requestFactory());
    } catch (error: any) {
      if (error.status === 403 || error.status === 401) {
        try {
          await firstValueFrom(this.authService.refreshToken());
          return await firstValueFrom(requestFactory());
        } catch (refreshError) {
          throw new Error('Session expired. Please login again.');
        }
      }
      throw error;
    }
  }
}
