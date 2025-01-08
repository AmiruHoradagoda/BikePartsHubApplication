import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface UserResponseDto {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  orders: OrderResponseDto[];
}

export interface OrderResponseDto {
  orderId: number;
  date: Date;
  status: string;
  total: number;
}

export interface PaginatedUserResponseDto {
  userResponseDtos: UserResponseDto[];
  dataCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminCustomersService {
  private apiUrl = `${environment.apiUrl}/api/v1/admin`;

  constructor(private http: HttpClient) {}

  getAllCustomers(
    customerName?: string,
    role?: string,
    page: number = 0,
    size: number = 9
  ): Observable<PaginatedUserResponseDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (customerName) {
      params = params.set('customerName', customerName);
    }
    if (role) {
      params = params.set('role', role);
    }

    return this.http.get<PaginatedUserResponseDto>(
      `${this.apiUrl}/getAllCustomerDetails`,
      { params }
    );
  }
}
