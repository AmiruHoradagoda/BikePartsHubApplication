import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-product-page',
  standalone:true,
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  imports: [ProductListComponent],
})
export class ProductPageComponent implements OnInit {
  category: string | null = null;

  partCategories: string[] = [];
  partBrands: string[] = [];
  bodyPartsCategories: string[] = [];
  bodyPartsBrands: string[] = [];
  bodyPartsColors: string[] = [];
  engineOilCategories: string[] = [];
  engineOilBrands: string[] = [];
  brakeOilCategories: string[] = [];
  brakeOilBrands: string[] = [];
  lubricantBrands: string[] = [];

  bikeTypes: string[] = [];
  bikeModels: string[] = [];
  bikeVersions: string[] = [];
  bikeManufactures: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getFilterList();
    this.productService.getFiltersLoaded().subscribe(() => {
      this.partCategories = this.productService.getPartCategory();
      this.partBrands = this.productService.getPartBrand();
      this.bodyPartsCategories = this.productService.getBodyPartsCategory();
      this.bodyPartsBrands = this.productService.getBodyPartsBrand();
      this.bodyPartsColors = this.productService.getBodyPartsColor();
      this.engineOilCategories = this.productService.getEngineOilCategory();
      this.engineOilBrands = this.productService.getEngineOilBrand();
      this.brakeOilCategories = this.productService.getBrakeOilCategory();
      this.brakeOilBrands = this.productService.getBrakeOilBrand();

      this.bikeTypes = this.productService.getBikeType();
      this.bikeModels = this.productService.getBikeModel();
      this.bikeVersions = this.productService.getBikeVersion();
      this.bikeManufactures = this.productService.getBikeManufacture();

    });

    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
    });

  }
}
