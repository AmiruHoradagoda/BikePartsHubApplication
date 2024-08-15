import { Component, Input, OnInit } from '@angular/core';
import { ProductFilterSidebarService } from './product-filter-sidebar.service';

@Component({
  selector: 'app-product-filter-sidebar',
  standalone: true,
  templateUrl: './product-filter-sidebar.component.html',
  styleUrl: './product-filter-sidebar.component.css',
})
export class ProductFilterSidebarComponent implements OnInit {
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

  @Input() category: string | null = null;

  constructor(private productSidebarService: ProductFilterSidebarService) {}

  ngOnInit(): void {
    this.productSidebarService.getFilterList();
    this.productSidebarService.getFiltersLoaded().subscribe(() => {
      this.partCategories = this.productSidebarService.getPartCategory();
      this.partBrands = this.productSidebarService.getPartBrand();
      this.bodyPartsCategories =
        this.productSidebarService.getBodyPartsCategory();
      this.bodyPartsBrands = this.productSidebarService.getBodyPartsBrand();
      this.bodyPartsColors = this.productSidebarService.getBodyPartsColor();
      this.engineOilCategories =
        this.productSidebarService.getEngineOilCategory();
      this.engineOilBrands = this.productSidebarService.getEngineOilBrand();
      this.brakeOilCategories =
        this.productSidebarService.getBrakeOilCategory();
      this.brakeOilBrands = this.productSidebarService.getBrakeOilBrand();

      this.bikeTypes = this.productSidebarService.getBikeType();
      this.bikeModels = this.productSidebarService.getBikeModel();
      this.bikeVersions = this.productSidebarService.getBikeVersion();
      this.bikeManufactures = this.productSidebarService.getBikeManufacture();
    });
  }
}

 

