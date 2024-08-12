import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/v1/product/save'; // API endpoint URL

  constructor(private http: HttpClient) {}

  saveProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }
}
