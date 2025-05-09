import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSearchDetail } from '../../../core/models/interface/ProductSearchDetail';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private apiUrl = 'https://bikepartshub.altero.dev/api/v1/product/getProductsByName';

  constructor(private http: HttpClient) {}

  searchProducts(
    productName: string,
    activeState: boolean = true,
    size: number = 10
  ): Observable<ProductSearchDetail[]> {
    let params = new HttpParams()
      .set('productName', productName)
      .set('activeState', activeState.toString())
      .set('size', size.toString());

    return this.http.get<ProductSearchDetail[]>(this.apiUrl, { params });
  }
}
