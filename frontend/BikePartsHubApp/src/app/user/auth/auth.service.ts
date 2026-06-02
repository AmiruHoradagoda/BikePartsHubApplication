import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  RegisterRequest,
  TokenPayload,
} from './auth.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/v1/auth`;
  private currentUserSubject =
    new BehaviorSubject<AuthenticationResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly STORAGE_KEY = 'currentUser';
  private readonly TOKEN_EXPIRY_WARNING_MS = 60_000;
  private tokenExpiryPromptTimer: ReturnType<typeof setTimeout> | null = null;
  private tokenExpiryPromptActive = false;

  constructor(private http: HttpClient) {
    this.initializeUserFromStorage();
  }

  private initializeUserFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(this.STORAGE_KEY);
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (this.isTokenExpired(user.access_token)) {
            this.logout();
          } else {
            this.currentUserSubject.next(user);
            this.scheduleTokenExpiryPrompt(user.access_token);
          }
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  getCurrentUser(): AuthenticationResponse | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number {
    const user = this.getCurrentUser();
    return user?.userId || 0;
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
    const currentUser = this.getCurrentUser();
    if (!currentUser?.refresh_token) {
      return throwError(() => new Error('No refresh token available'));
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${currentUser.refresh_token}`
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
    this.clearTokenExpiryPrompt();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.currentUserSubject.next(null);
  }

  getAuthHeader(): HttpHeaders {
    const user = this.getCurrentUser();
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${user?.access_token || ''}`
    );
  }

  isLoggedIn(): boolean {
    const user = this.getCurrentUser();
    return !!user && !this.isTokenExpired(user.access_token);
  }

  private storeUserData(response: AuthenticationResponse): void {
    if (!response.access_token || !response.refresh_token) {
      throw new Error('Invalid authentication response');
    }
    const user = {
      ...this.getCurrentUser(),
      ...response,
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
    this.scheduleTokenExpiryPrompt(user.access_token);
  }

  private isTokenExpired(token: string): boolean {
    const expiry = this.getTokenExpiryTime(token);
    return !expiry || Date.now() >= expiry;
  }

  private getTokenExpiryTime(token: string): number | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
      return payload.exp * 1000;
    } catch (e) {
      return null;
    }
  }

  private scheduleTokenExpiryPrompt(token: string): void {
    this.clearTokenExpiryPrompt();

    if (typeof window === 'undefined') {
      return;
    }

    const expiryTime = this.getTokenExpiryTime(token);
    if (!expiryTime) {
      this.logout();
      return;
    }

    const promptDelay = expiryTime - Date.now() - this.TOKEN_EXPIRY_WARNING_MS;
    if (promptDelay <= 0) {
      this.showTokenExpiryPrompt();
      return;
    }

    this.tokenExpiryPromptTimer = setTimeout(
      () => this.showTokenExpiryPrompt(),
      promptDelay
    );
  }

  private clearTokenExpiryPrompt(): void {
    if (this.tokenExpiryPromptTimer) {
      clearTimeout(this.tokenExpiryPromptTimer);
      this.tokenExpiryPromptTimer = null;
    }
  }

  private showTokenExpiryPrompt(): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser || this.tokenExpiryPromptActive) {
      return;
    }

    this.tokenExpiryPromptActive = true;
    const keepSession = window.confirm(
      'Your session is about to expire. Do you want to stay signed in?'
    );

    if (!keepSession) {
      this.tokenExpiryPromptActive = false;
      this.logout();
      return;
    }

    this.refreshToken().subscribe({
      next: () => {
        this.tokenExpiryPromptActive = false;
      },
      error: () => {
        this.tokenExpiryPromptActive = false;
        window.alert('Your session has expired. Please login again.');
        this.logout();
      },
    });
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

  // Utility methods for appointment system
  getUserFullName(): string {
    const user = this.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  getUserEmail(): string {
    return this.getCurrentUser()?.email || '';
  }

  isCustomer(): boolean {
    return this.getCurrentUser()?.role === 'CUSTOMER';
  }
}
