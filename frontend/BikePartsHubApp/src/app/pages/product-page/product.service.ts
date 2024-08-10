import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/interface/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/api/v1/product/getAllProducts`
    );
  }
}
