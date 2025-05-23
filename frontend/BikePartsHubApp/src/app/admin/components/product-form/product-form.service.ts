import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductGet, ProductSave, ProductUpdate } from '../../../core/models/interface/Product';
import { BikeService } from '../../../shared/services/bike.service';
import { Bike } from '../../../core/models/interface/Bike';
import { AdminAuthService } from '../../auth-admin/auth-admin.service';


@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  updateProduct(productId: string, product: ProductSave) {
    throw new Error('Method not implemented.');
  }
  private apiUrl: string = 'https://bikepartshub.altero.dev';

  private bikeType = new Set<string>();
  private bikeModel = new Set<string>();
  private bikeVersion = new Set<string>();
  private bikeManufacture = new Set<string>();

  constructor(
    private bikeService: BikeService,
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/api/v1/bikes/getAllBikes`, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }

  getBikeId(
    type: string,
    model: string,
    version: string,
    manufacture: string
  ): Observable<number | null> {
    const url = `${
      this.apiUrl
    }/api/v1/bikes/getBikeId?type=${encodeURIComponent(
      type
    )}&model=${encodeURIComponent(model)}&version=${encodeURIComponent(
      version
    )}&manufacture=${encodeURIComponent(manufacture)}`;

    // Perform the GET request and return the observable
    return this.http.get<number | null>(url, {
      headers: this.adminAuthService.getAuthHeader(),
    });
  }

  getProductById(productId: string): Observable<ProductGet> {
    return this.http.get<ProductGet>(
      `${this.apiUrl}/api/v1/product/getProductById`,
      {
        params: { productId },
        headers: this.adminAuthService.getAuthHeader(),
      }
    );
  }
  saveProduct(productSaveRequestDto: ProductSave): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/api/v1/product/save`,
      productSaveRequestDto,
      { headers: this.adminAuthService.getAuthHeader() }
    );
  }

  updateProductDetails(
    productId: string,
    productUpdateRequestDto: ProductUpdate
  ): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/api/v1/product/update?productId=${productId}`, // Append productId to the URL
      productUpdateRequestDto,
      { headers: this.adminAuthService.getAuthHeader() }
    );
  }
}
