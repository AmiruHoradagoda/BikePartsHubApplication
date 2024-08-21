import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; // Adjust the import paths as needed
import { environment } from '../../../environments/environment.development'; // Import the correct environment
import { PaginatedResponseIProduct } from '../../core/models/interface/PaginatedResponseIProduct';
import { ProductGet, ProductSave, ProductUpdate } from '../../core/models/interface/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<ProductGet[]> {
    return this.http.get<ProductGet[]>(
      `${this.apiUrl}/api/v1/product/getAllProducts`
    );
  }

  // Get paginated and filtered products
  getProducts(
    category?: string,
    productType?: string,
    productManufacture?: string,
    activeState?: boolean,
    bikeType?: string,
    bikeModel?: string,
    bikeManufacture?: string,
    color?: string,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponseIProduct> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (category) params = params.set('category', category);
    if (productType) params = params.set('productType', productType);
    if (productManufacture)
      params = params.set('productManufacture', productManufacture);
    if (activeState !== undefined)
      params = params.set('activeState', activeState.toString());
    if (bikeType) params = params.set('bikeType', bikeType);
    if (bikeModel) params = params.set('bikeModel', bikeModel);
    if (bikeManufacture)
      params = params.set('bikeManufacture', bikeManufacture);
    if (color) params = params.set('color', color);

    return this.http.get<PaginatedResponseIProduct>(
      `${this.apiUrl}/api/v1/product/getProducts`,
      { params }
    );
  }

  // Save a new product
  saveProduct(productSaveRequestDto: ProductSave): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/api/v1/product/save`,
      productSaveRequestDto
    );
  }


  // Delete a product by its ID
  deleteProductDetails(productId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/v1/product/delete`, {
      body: productId,
    });
  }
}
