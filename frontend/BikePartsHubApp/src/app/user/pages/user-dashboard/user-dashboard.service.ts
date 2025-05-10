import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface OrderResponseDto {
  orderId: number;
  date: string;
  status: 'DELIVERED' | 'PROCESSING' | 'SHIPPED';
  total: number;
}

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

export interface UserUpdateDto {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/user`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserDetails(userId: number): Observable<UserResponseDto> {
    return this.http
      .get<StandardResponse<UserResponseDto>>(
        `${this.apiUrl}/getUserDetails/${userId}`
      )
      .pipe(
        map((response: StandardResponse<UserResponseDto>) => response.data)
      );
  }

  updateUserProfile(
    userId: number,
    userData: UserUpdateDto
  ): Observable<UserResponseDto> {
    return this.http
      .put<StandardResponse<UserResponseDto>>(
        `${this.apiUrl}/updateProfile/${userId}`,
        userData,
        {
          headers: this.authService.getAuthHeader(),
        }
      )
      .pipe(
        map((response: StandardResponse<UserResponseDto>) => response.data)
      );
  }
}
