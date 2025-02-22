import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Bike } from '../../../../../core/models/interface/Bike';
import { BikeService } from '../../../../../shared/services/bike.service';
import { ProductService } from '../../../../../shared/services/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductFilterSidebarService {

  private apiUrl: string = 'http://localhost:8080';

  private partCategory = new Set<string>();
  private partBrand = new Set<string>();

  private bodyPartsCategory = new Set<string>();
  private bodyPartsBrand = new Set<string>();
  private bodyPartsColor = new Set<string>();

  private engineOilBrand = new Set<string>();
  private engineOilCategory = new Set<string>();

  private brakeOilBrand = new Set<string>();
  private brakeOilCategory = new Set<string>();

  private lubricantBrand = new Set<string>();

  private bikeType = new Set<string>();
  private bikeModel = new Set<string>();
  private bikeVersion = new Set<string>();
  private bikeManufacture = new Set<string>();

  private filtersLoaded = new Subject<void>();

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private bikeService: BikeService
  ) {}


  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/api/v1/bikes/getAllBikes`);
  }




  
  getFilterList(): void {
    this.productService.getAllProducts().subscribe((products) => {
      // Clear previous data
      this.partCategory.clear();
      this.partBrand.clear();
      this.bodyPartsCategory.clear();
      this.bodyPartsBrand.clear();
      this.bodyPartsColor.clear();
      this.engineOilCategory.clear();
      this.engineOilBrand.clear();
      this.brakeOilCategory.clear();
      this.brakeOilBrand.clear();
      this.lubricantBrand.clear();

      // Process the products
      for (const product of products) {
        switch (product.productType) {
          case 'PARTS':
            this.partCategory.add(product.category);
            this.partBrand.add(product.manufacture);
            break;
          case 'BODY_PARTS':
            this.bodyPartsCategory.add(product.category);
            this.bodyPartsBrand.add(product.manufacture);
            product.productAttributes.forEach((attr) => {
              this.bodyPartsColor.add(attr.color);
            });
            break;
          case 'ENGINE_OIL':
            this.engineOilCategory.add(product.category);
            this.engineOilBrand.add(product.manufacture);
            break;
          case 'BRAKE_OIL':
            this.brakeOilBrand.add(product.manufacture);
            this.brakeOilCategory.add(product.category);
            break;
          case 'LUBRICANT':
            this.lubricantBrand.add(product.manufacture);
            break;
        }
      }

      this.bikeService.getBikes().subscribe((bikes) => {
        for (const bike of bikes) {
          this.bikeModel.add(bike.model);
          this.bikeManufacture.add(bike.manufacture);
          this.bikeType.add(bike.type);
          this.bikeVersion.add(bike.version);
        }
        // Notify subscribers that filters have been loaded
        this.filtersLoaded.next();
      });
    });
  }

  // Getters for filter data
  getPartCategory(): string[] {
    return Array.from(this.partCategory);
  }

  getPartBrand(): string[] {
    return Array.from(this.partBrand);
  }

  getBodyPartsCategory(): string[] {
    return Array.from(this.bodyPartsCategory);
  }

  getBodyPartsBrand(): string[] {
    return Array.from(this.bodyPartsBrand);
  }

  getBodyPartsColor(): string[] {
    return Array.from(this.bodyPartsColor);
  }

  getEngineOilCategory(): string[] {
    return Array.from(this.engineOilCategory);
  }

  getEngineOilBrand(): string[] {
    return Array.from(this.engineOilBrand);
  }

  getBrakeOilCategory(): string[] {
    return Array.from(this.brakeOilCategory);
  }

  getBrakeOilBrand(): string[] {
    return Array.from(this.brakeOilBrand);
  }

  getLubricantBrand(): string[] {
    return Array.from(this.lubricantBrand);
  }

  getBikeType(): string[] {
    return Array.from(this.bikeType);
  }

  getBikeModel(): string[] {
    return Array.from(this.bikeModel);
  }

  getBikeVersion(): string[] {
    return Array.from(this.bikeVersion);
  }

  getBikeManufacture(): string[] {
    return Array.from(this.bikeManufacture);
  }

  getFiltersLoaded(): Observable<void> {
    return this.filtersLoaded.asObservable();
  }


}
