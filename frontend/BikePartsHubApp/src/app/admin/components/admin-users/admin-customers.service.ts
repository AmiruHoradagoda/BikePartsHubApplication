import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';

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

export interface CustomerProfileDto {
  customerResponse: UserResponseDto;
  pending: number;
  cancelled: number;
  onTheWay: number;
  completed: number;
  totalOrder: number;
  totalSpend: number;
  totalSchedule: number;
}
export interface ShippingAddress {
  address: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
}

export interface OrderDetail {
  orderDetailId: number;
  productName: string;
  qty: number;
  imageUrl: string;
  amount: number;
}

export interface OrderResponseWithDetails {
  orderId: number;
  firstName: string;
  lastName: string;
  email: string;
  shippingAddress: ShippingAddress;
  date: Date;
  status: string;
  total: number;
  orderDetails: OrderDetail[];
}

export interface PaginatedOrderResponseWithDetails {
  orderResponses: OrderResponseWithDetails[];
  dataCount: number;
}

export enum AppointmentStatus {
  COMPLETED = 'COMPLETED',
  ATTENDED = 'ATTENDED',
  UPCOMING = 'UPCOMING',
  MISSED = 'MISSED',
  ALL = 'ALL',
}

export interface ServiceTypeDto {
  serviceName: string;
  serviceDuration: number;
  serviceCost: number;
  description: string;
  features: string[];
}

export interface AppointmentResponseDto {
  name: string;
  mobile: string;
  date: string;
  startTime: string;
  serviceDuration: number;
  plateNumber: string;
  engineOil: string;
  engineOilCost: number;
  totalCharge: number;
  serviceTypeDto: ServiceTypeDto;
  appointmentStatus: AppointmentStatus;
}

@Injectable({
  providedIn: 'root',
})
export class AdminCustomersService {
  private apiUrl = `${environment.apiUrl}/api/v1/admin`;

  constructor(
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

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
      {
        params,
        headers: this.adminAuthService.getAuthHeader(),
      }
    );
  }

  getCustomerProfile(id: number): Observable<CustomerProfileDto> {
    return this.http.get<CustomerProfileDto>(
      `${this.apiUrl}/getCustomerProfile/${id}`,
      {
        headers: this.adminAuthService.getAuthHeader(),
      }
    );
  }

  getCustomerOrders(
    id: number,
    status?: string,
    page: number = 0,
    size: number = 9
  ): Observable<PaginatedOrderResponseWithDetails> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) {
      params = params.set('orderStatus', status);
    }

    return this.http.get<PaginatedOrderResponseWithDetails>(
      `${this.apiUrl}/getCustomerOrders/${id}`,
      { params, headers: this.adminAuthService.getAuthHeader() }
    );
  }

  getCustomerAppointments(id: number): Observable<AppointmentResponseDto[]> {
    return this.http.get<AppointmentResponseDto[]>(
      `${this.apiUrl}/getCustomerAppointments/${id}`,
      {
        headers: this.adminAuthService.getAuthHeader(),
      }
    );
  }
}
