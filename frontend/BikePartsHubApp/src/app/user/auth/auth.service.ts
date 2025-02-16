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

  private readonly STORAGE_KEYS = {
    CURRENT_USER: 'currentUser',
    ACCESS_TOKEN: 'user_access_token',
    REFRESH_TOKEN: 'user_refresh_token',
  };

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (this.isTokenExpired(user.access_token)) {
            this.logout();
          } else {
            this.currentUserSubject.next(user);
          }
        } catch (e) {
          this.logout();
        }
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
        tap((response) => this.storeUserData(response)),
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
          if (response.role === 'ADMIN') {
            throw new Error('Invalid user role');
          }
          this.storeUserData(response);
        }),
        catchError(this.handleError)
      );
  }

  refreshToken(): Observable<AuthenticationResponse> {
    const refreshToken = localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
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
        tap((response) => this.storeUserData(response)),
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            this.logout();
            return throwError(
              () => new Error('Session expired. Please login again.')
            );
          }
          return this.handleError(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(this.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(this.STORAGE_KEYS.REFRESH_TOKEN);
    this.currentUserSubject.next(null);
  }

  getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem(this.STORAGE_KEYS.ACCESS_TOKEN);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  isLoggedIn(): boolean {
    const user = this.currentUserValue;
    return !!user && !this.isTokenExpired(user.access_token);
  }

  private storeUserData(response: AuthenticationResponse): void {
    if (!response.access_token || !response.refresh_token) {
      throw new Error('Invalid authentication response');
    }
    localStorage.setItem(
      this.STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(response)
    );
    localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(
      this.STORAGE_KEYS.REFRESH_TOKEN,
      response.refresh_token
    );
    this.currentUserSubject.next(response);
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
    console.error('Auth service error:', error);
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message || error.statusText}`;
    }
    return throwError(() => errorMessage);
  }
}