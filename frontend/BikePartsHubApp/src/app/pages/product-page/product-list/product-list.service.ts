import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PaginatedResponseIProduct } from '../../../core/models/interface/PaginatedResponseIProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(
    category: string | null = null,
    productType: string | null = null,
    productManufacture: string | null = null,
    activeState: boolean = true,
    bikeType: string | null = null,
    bikeModel: string | null = null,
    bikeManufacture: string | null = null,
    color: string | null = null,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponseIProduct> {
    let params = new HttpParams()
      .set('activeState', activeState.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    if (category) {
      params = params.set('category', category);
    }
    if (productType) {
      params = params.set('productType', productType);
    }
    if (productManufacture) {
      params = params.set('productManufacture', productManufacture);
    }
    if (bikeType) {
      params = params.set('bikeType', bikeType);
    }
    if (bikeModel) {
      params = params.set('bikeModel', bikeModel);
    }
    if (bikeManufacture) {
      params = params.set('bikeManufacture', bikeManufacture);
    }
    if (color) {
      params = params.set('color', color);
    }

    return this.http.get<PaginatedResponseIProduct>(
      `${this.apiUrl}/api/v1/product/getProducts`,
      { params }
    );
  }
}
