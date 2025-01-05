import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterRequest,
} from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private currentUserSubject =
    new BehaviorSubject<AuthenticationResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }
  get currentUserValue(): AuthenticationResponse | null {
    return this.currentUserSubject.value;
  }
  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}/register`, request)
      .pipe(
        tap((response) => {
          this.storeUserData(response);
        }),
        catchError(this.handleError)
      );
  }

  authenticate(
    request: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap((response) => {
          this.storeUserData(response);
        }),
        catchError(this.handleError)
      );
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
          this.storeUserData(response);
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
          this.storeUserData(response);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
  }

  private storeUserData(response: AuthenticationResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(response));
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    this.currentUserSubject.next(response);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
