import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductFilterSidebarService } from './product-filter-sidebar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter-sidebar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './product-filter-sidebar.component.html',
  styleUrls: ['./product-filter-sidebar.component.css'],
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

  partCategorie: string = "";
  partBrand: string = "";
  bodyPartsCategorie: string = "";
  bodyPartsBrand: string = "";
  bodyPartsColor: string = "";
  engineOilCategorie: string = "";
  engineOilBrand: string = "";
  brakeOilCategorie: string = "";
  brakeOilBrand: string = "";
  lubricantBrand: string = "";

  bikeType: string = "";
  bikeModel: string = "";
  bikeVersion: string = "";
  bikeManufacture: string = "";

  @Input() productType: string | null = null;
  @Output() partsFilterInfo = new EventEmitter<{
    partCategorie?: string;
    partBrand?: string;
    bodyPartsCategorie?: string;
    bodyPartsBrand?: string;
    bodyPartsColor?: string;
    engineOilCategorie?: string;
    engineOilBrand?: string;
    brakeOilCategorie?: string;
    brakeOilBrand?: string;
    lubricantBrand?: string;
    bikeType?: string;
    bikeModel?: string;
    bikeVersion?: string;
    bikeManufacture?: string;
  }>();

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

  applyFilters(): void {
    console.log('Filters applied: ', {
      partCategorie: this.partCategorie,
      partBrand: this.partBrand,
      bodyPartsCategorie: this.bodyPartsCategorie,
      bodyPartsBrand: this.bodyPartsBrand,
      bodyPartsColor: this.bodyPartsColor,
      engineOilCategorie: this.engineOilCategorie,
      engineOilBrand: this.engineOilBrand,
      brakeOilCategorie: this.brakeOilCategorie,
      brakeOilBrand: this.brakeOilBrand,
      lubricantBrand: this.lubricantBrand,
      bikeType: this.bikeType,
      bikeModel: this.bikeModel,
      bikeVersion: this.bikeVersion,
      bikeManufacture: this.bikeManufacture,
    });
    this.partsFilterInfo.emit({
      partCategorie: this.partCategorie,
      partBrand: this.partBrand,
      bodyPartsCategorie: this.bodyPartsCategorie,
      bodyPartsBrand: this.bodyPartsBrand,
      bodyPartsColor: this.bodyPartsColor,
      engineOilCategorie: this.engineOilCategorie,
      engineOilBrand: this.engineOilBrand,
      brakeOilCategorie: this.brakeOilCategorie,
      brakeOilBrand: this.brakeOilBrand,
      lubricantBrand: this.lubricantBrand,
      bikeType: this.bikeType,
      bikeModel: this.bikeModel,
      bikeVersion: this.bikeVersion,
      bikeManufacture: this.bikeManufacture,
    });
  }
}
