import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private userSubject = new BehaviorSubject<any>(
    this.getUserFromLocalStorage()
  );
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      tap((response: any) => {
        this.saveUserDetails(response.user);
      })
    );
  }

  authenticate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, data).pipe(
      tap((response: any) => {
        this.saveUserDetails(response.user);
      })
    );
  }

  private getUserFromLocalStorage(): any {
    if (typeof localStorage !== 'undefined') {
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  saveUserDetails(user: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.userSubject.next(user);
  }

  clearUserDetails(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }
}
