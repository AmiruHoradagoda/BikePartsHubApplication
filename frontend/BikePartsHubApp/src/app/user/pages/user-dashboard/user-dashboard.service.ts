import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

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

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/user`;

  constructor(private http: HttpClient) {}

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
    userData: Partial<UserResponseDto>
  ): Observable<UserResponseDto> {
    return this.http
      .put<StandardResponse<UserResponseDto>>(
        `${this.apiUrl}/updateProfile/${userId}`,
        userData
      )
      .pipe(
        map((response: StandardResponse<UserResponseDto>) => response.data)
      );
  }
}