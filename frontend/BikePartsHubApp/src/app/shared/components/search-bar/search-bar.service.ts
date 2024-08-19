import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private apiUrl = 'http://localhost:8080/api/v1/product/getProductsByName'; 

  constructor(private http: HttpClient) {}

  searchProducts(
    productName: string,
    activeState: boolean = true,
    size: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('productName', productName)
      .set('activeState', activeState.toString())
      .set('size', size.toString());

    return this.http.get(this.apiUrl, { params });
  }
}
