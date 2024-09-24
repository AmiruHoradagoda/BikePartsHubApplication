import { Injectable } from '@angular/core';
import { BikeService } from '../../../shared/services/bike.service';
import { Observable } from 'rxjs';
import { Bike, BikeGet } from '../../../core/models/interface/Bike';
import { HttpClient } from '@angular/common/http';
import { ProductGet, ProductSave, ProductUpdate } from '../../../core/models/interface/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  updateProduct(productId: string, product: ProductSave) {
    throw new Error('Method not implemented.');
  }
  private apiUrl: string = 'http://localhost:8080';

  private bikeType = new Set<string>();
  private bikeModel = new Set<string>();
  private bikeVersion = new Set<string>();
  private bikeManufacture = new Set<string>();

  constructor(private bikeService: BikeService, private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/api/v1/bikes/getAllBikes`);
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
    return this.http.get<number | null>(url);
  }

  getProductById(productId: string): Observable<ProductGet> {
    return this.http.get<ProductGet>(
      `${this.apiUrl}/api/v1/product/getProductById`,
      {
        params: { productId },
      }
    );
  }
  saveProduct(productSaveRequestDto: ProductSave): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/api/v1/product/save`,
      productSaveRequestDto
    );
  }

  updateProductDetails(
    productId: string,
    productUpdateRequestDto: ProductUpdate
  ): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/api/v1/product/update?productId=${productId}`, // Append productId to the URL
      productUpdateRequestDto
    );
  }

  
}
