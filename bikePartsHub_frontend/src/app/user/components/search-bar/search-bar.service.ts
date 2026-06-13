import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSearchDetail } from '../../../core/models/interface/ProductSearchDetail';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private apiUrl = `${environment.apiUrl}/api/v1/product/getProductsByName`;

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
