import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationRequest, AuthenticationResponse } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private currentAdminSubject =
    new BehaviorSubject<AuthenticationResponse | null>(null);
  currentAdmin$ = this.currentAdminSubject.asObservable();

  private readonly STORAGE_KEYS = {
    CURRENT_ADMIN: 'currentAdmin',
    ADMIN_ACCESS_TOKEN: 'admin_access_token',
    ADMIN_REFRESH_TOKEN: 'admin_refresh_token',
  };

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const storedAdmin = localStorage.getItem(this.STORAGE_KEYS.CURRENT_ADMIN);
      if (storedAdmin) {
        try {
          const admin = JSON.parse(storedAdmin);
          if (this.isTokenExpired(admin.access_token)) {
            this.logout();
          } else {
            this.currentAdminSubject.next(admin);
          }
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  get currentAdminValue(): AuthenticationResponse | null {
    return this.currentAdminSubject.value;
  }

  authenticateAdmin(
    request: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap((response) => {
          if (response.role !== 'ADMIN') {
            throw new Error('Unauthorized: Admin access only');
          }
          this.storeAdminData(response);
        }),
        catchError((error) => {
          if (error.message === 'Unauthorized: Admin access only') {
            return throwError(
              () => 'This login is restricted to administrators only'
            );
          }
          return this.handleError(error);
        })
      );
  }

  refreshToken(): Observable<AuthenticationResponse> {
    const refreshToken = localStorage.getItem(
      this.STORAGE_KEYS.ADMIN_REFRESH_TOKEN
    );
    if (!refreshToken) {
      return throwError(() => new Error('No admin refresh token available'));
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${refreshToken}`
    );

    return this.http
      .post<AuthenticationResponse>(
        `${this.baseUrl}/refresh-token`,
        {},
        { headers }
      )
      .pipe(
        tap((response) => {
          if (response.role !== 'ADMIN') {
            throw new Error('Invalid admin token refresh response');
          }
          this.storeAdminData(response);
        }),
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            this.logout();
            return throwError(
              () => new Error('Admin session expired. Please login again.')
            );
          }
          return this.handleError(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_ADMIN);
    localStorage.removeItem(this.STORAGE_KEYS.ADMIN_ACCESS_TOKEN);
    localStorage.removeItem(this.STORAGE_KEYS.ADMIN_REFRESH_TOKEN);
    this.currentAdminSubject.next(null);
  }

  getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem(this.STORAGE_KEYS.ADMIN_ACCESS_TOKEN);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  isAdminLoggedIn(): boolean {
    const admin = this.currentAdminValue;
    return (
      !!admin &&
      admin.role === 'ADMIN' &&
      !this.isTokenExpired(admin.access_token)
    );
  }

  private storeAdminData(admin: AuthenticationResponse): void {
    if (!admin.access_token || !admin.refresh_token) {
      throw new Error('Invalid authentication response');
    }
    localStorage.setItem(
      this.STORAGE_KEYS.CURRENT_ADMIN,
      JSON.stringify(admin)
    );
    localStorage.setItem(
      this.STORAGE_KEYS.ADMIN_ACCESS_TOKEN,
      admin.access_token
    );
    localStorage.setItem(
      this.STORAGE_KEYS.ADMIN_REFRESH_TOKEN,
      admin.refresh_token
    );
    this.currentAdminSubject.next(admin);
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() >= expiry;
    } catch (e) {
      return true;
    }
  }

  private handleError(error: any) {
    console.error('Admin auth service error:', error);
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message || error.statusText}`;
    }
    return throwError(() => errorMessage);
  }
}