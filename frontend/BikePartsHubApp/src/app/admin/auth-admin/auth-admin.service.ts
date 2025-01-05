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

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const storedAdmin = localStorage.getItem('currentAdmin');
      if (storedAdmin) {
        this.currentAdminSubject.next(JSON.parse(storedAdmin));
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
    const refreshToken = localStorage.getItem('refresh_token');
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
          this.storeAdminData(response);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentAdmin');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    this.currentAdminSubject.next(null);
  }

  isAdminLoggedIn(): boolean {
    return !!this.currentAdminValue && this.currentAdminValue.role === 'ADMIN';
  }

  private storeAdminData(admin: AuthenticationResponse): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentAdmin', JSON.stringify(admin));
      localStorage.setItem('access_token', admin.access_token);
      localStorage.setItem('refresh_token', admin.refresh_token);
    }
    this.currentAdminSubject.next(admin);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message || error.statusText}`;
    }
    return throwError(() => errorMessage);
  }
}
