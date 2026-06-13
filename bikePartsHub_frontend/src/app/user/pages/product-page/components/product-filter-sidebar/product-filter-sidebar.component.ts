import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductFilterSidebarService } from './product-filter-sidebar.service';


@Component({
  selector: 'app-product-filter-sidebar',
  templateUrl: './product-filter-sidebar.component.html',
  styleUrls: ['./product-filter-sidebar.component.scss'],
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

  partCategorie: string = '';
  partBrand: string = '';
  bodyPartsCategorie: string = '';
  bodyPartsBrand: string = '';
  bodyPartsColor: string = '';
  engineOilCategorie: string = '';
  engineOilBrand: string = '';
  brakeOilCategorie: string = '';
  brakeOilBrand: string = '';
  lubricantBrand: string = '';

  bikeType: string = '';
  bikeModel: string = '';
  bikeVersion: string = '';
  bikeManufacture: string = '';

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

  // applyFilters(): void {
  //   console.log('Filters applied: ', {
  //     partCategorie: this.partCategorie,
  //     partBrand: this.partBrand,
  //     bodyPartsCategorie: this.bodyPartsCategorie,
  //     bodyPartsBrand: this.bodyPartsBrand,
  //     bodyPartsColor: this.bodyPartsColor,
  //     engineOilCategorie: this.engineOilCategorie,
  //     engineOilBrand: this.engineOilBrand,
  //     brakeOilCategorie: this.brakeOilCategorie,
  //     brakeOilBrand: this.brakeOilBrand,
  //     lubricantBrand: this.lubricantBrand,
  //     bikeType: this.bikeType,
  //     bikeModel: this.bikeModel,
  //     bikeVersion: this.bikeVersion,
  //     bikeManufacture: this.bikeManufacture,
  //   });
  //   this.partsFilterInfo.emit({
  //     partCategorie: this.partCategorie,
  //     partBrand: this.partBrand,
  //     bodyPartsCategorie: this.bodyPartsCategorie,
  //     bodyPartsBrand: this.bodyPartsBrand,
  //     bodyPartsColor: this.bodyPartsColor,
  //     engineOilCategorie: this.engineOilCategorie,
  //     engineOilBrand: this.engineOilBrand,
  //     brakeOilCategorie: this.brakeOilCategorie,
  //     brakeOilBrand: this.brakeOilBrand,
  //     lubricantBrand: this.lubricantBrand,
  //     bikeType: this.bikeType,
  //     bikeModel: this.bikeModel,
  //     bikeVersion: this.bikeVersion,
  //     bikeManufacture: this.bikeManufacture,
  //   });
  // }

  clearFilters(): void {
    // Reset all filter values
    this.partCategorie = '';
    this.partBrand = '';
    this.bodyPartsCategorie = '';
    this.bodyPartsBrand = '';
    this.bodyPartsColor = '';
    this.engineOilCategorie = '';
    this.engineOilBrand = '';
    this.brakeOilCategorie = '';
    this.brakeOilBrand = '';
    this.lubricantBrand = '';
    this.bikeType = '';
    this.bikeModel = '';
    this.bikeVersion = '';
    this.bikeManufacture = '';

    // Emit empty filter info
    this.applyFilters();
  }
  hasActiveFilters(): boolean {
    return Object.values(this.getFilterValues()).some((value) => value !== '');
  }
  getFilterValues(): any {
    const filterValues: { [key: string]: string } = {};

    // Only include relevant filters based on product type
    if (this.productType === 'Parts') {
      filterValues['partCategorie'] = this.partCategorie;
      filterValues['partBrand'] = this.partBrand;
      filterValues['bikeType'] = this.bikeType;
      filterValues['bikeModel'] = this.bikeModel;
      filterValues['bikeVersion'] = this.bikeVersion;
      filterValues['bikeManufacture'] = this.bikeManufacture;
    } else if (this.productType === 'Body Parts') {
      filterValues['bodyPartsCategorie'] = this.bodyPartsCategorie;
      filterValues['bodyPartsColor'] = this.bodyPartsColor;
      filterValues['bikeType'] = this.bikeType;
      filterValues['bikeModel'] = this.bikeModel;
      filterValues['bikeVersion'] = this.bikeVersion;
      filterValues['bikeManufacture'] = this.bikeManufacture;
    } else if (this.productType === 'Engine Oil') {
      filterValues['engineOilCategorie'] = this.engineOilCategorie;
      filterValues['engineOilBrand'] = this.engineOilBrand;
    } else if (this.productType === 'Brake OilL') {
      filterValues['brakeOilCategorie'] = this.brakeOilCategorie;
      filterValues['brakeOilBrand'] = this.brakeOilBrand;
    } else if (this.productType === 'Lubricants') {
      filterValues['lubricantBrand'] = this.lubricantBrand;
    }

    return filterValues;
  }
  getActiveFilters(): { key: string; name: string; value: string }[] {
    const filters = [];
    const values = this.getFilterValues();

    for (const [key, value] of Object.entries(values)) {
      if (value) {
        filters.push({
          key,
          name: this.getDisplayName(key),
          value: value as string,
        });
      }
    }

    return filters;
  }
  removeFilter(key: string): void {
    // Reset the specified filter
    (this as any)[key] = '';
    this.applyFilters();
  }

  private getDisplayName(key: string): string {
    const displayNames: { [key: string]: string } = {
      partCategorie: 'Part Category',
      partBrand: 'Part Brand',
      bodyPartsCategorie: 'Body Parts Category',
      bodyPartsColor: 'Color',
      engineOilCategorie: 'Engine Oil Category',
      engineOilBrand: 'Engine Oil Brand',
      brakeOilCategorie: 'Brake Oil Category',
      brakeOilBrand: 'Brake Oil Brand',
      lubricantBrand: 'Lubricant Brand',
      bikeType: 'Bike Type',
      bikeModel: 'Bike Model',
      bikeVersion: 'Version',
      bikeManufacture: 'Manufacturer',
    };

    return displayNames[key] || key;
  }

  // Your existing applyFilters method remains the same
  applyFilters(): void {
    console.log('Filters applied: ', this.getFilterValues());
    this.partsFilterInfo.emit(this.getFilterValues());
  }
}
