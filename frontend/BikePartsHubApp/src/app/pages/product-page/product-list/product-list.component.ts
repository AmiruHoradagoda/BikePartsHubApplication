import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductGet } from '../../../core/models/interface/Product';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [ProductCardComponent, CommonModule],
})
export class ProductListComponent implements OnInit, OnChanges {
  products: ProductGet[] = [];
  filteredProducts: ProductGet[] = [];

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  @Input() partsFilterInfo: {
    productType?: string;
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
  } = {};

  productType: string = '';

  constructor(
    private route: ActivatedRoute,
    private productListService: ProductListService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.productType = params.get('category') || '';
    });
    this.loadProducts(); // Load initial products
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['partsFilterInfo'] && !changes['partsFilterInfo'].firstChange) {
      this.currentPage = 1; // Reset to first page when filters change
      this.loadProducts(); // Re-load products when filter info changes
    }
  }

  loadProducts(): void {
    this.productListService
      .getProducts(
        this.partsFilterInfo.partCategorie,
        this.productType,
        this.partsFilterInfo.partBrand,
        true, // Assuming activeState is true for filtering active products
        this.partsFilterInfo.bikeType,
        this.partsFilterInfo.bikeModel,
        this.partsFilterInfo.bikeManufacture,
        this.partsFilterInfo.bodyPartsColor,
        this.currentPage - 1, // API page number is 0-based
        this.pageSize
      )
      .subscribe((response) => {
        this.products = response.productDetailsList;
        this.totalPages = Math.ceil(response.dataCount / this.pageSize);
        this.applyFilters(); // Apply filters after loading products
      });
  }

  applyFilters(): void {
    console.log('Applying filters:', this.partsFilterInfo);
    if (this.partsFilterInfo.productType === 'PARTS') {
      this.filteredProducts = this.products.filter((product) => {
        return (
          (!this.partsFilterInfo.productType ||
            product.productType === this.partsFilterInfo.productType) &&
          (!this.partsFilterInfo.partCategorie ||
            product.category === this.partsFilterInfo.partCategorie) &&
          (!this.partsFilterInfo.partBrand ||
            product.manufacture === this.partsFilterInfo.partBrand) &&
          (!this.partsFilterInfo.bikeType ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) => bike.type === this.partsFilterInfo.bikeType
              )
            )) &&
          (!this.partsFilterInfo.bikeModel ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) => bike.model === this.partsFilterInfo.bikeModel
              )
            )) &&
          (!this.partsFilterInfo.bikeVersion ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) => bike.version === this.partsFilterInfo.bikeVersion
              )
            )) &&
          (!this.partsFilterInfo.bikeManufacture ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) =>
                  bike.manufacture === this.partsFilterInfo.bikeManufacture
              )
            ))
        );
      });
    } else if (this.partsFilterInfo.productType === 'BODY_PART') {
      this.filteredProducts = this.products.filter((product) => {
        return (
          (!this.partsFilterInfo.bodyPartsCategorie ||
            product.category === this.partsFilterInfo.bodyPartsCategorie) &&
          (!this.partsFilterInfo.bodyPartsBrand ||
            product.manufacture === this.partsFilterInfo.bodyPartsBrand) &&
          (!this.partsFilterInfo.bodyPartsColor ||
            product.productAttributes.some(
              (attr) => attr.color === this.partsFilterInfo.bodyPartsColor
            )) &&
          (!this.partsFilterInfo.bikeModel ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) => bike.model === this.partsFilterInfo.bikeModel
              )
            )) &&
          (!this.partsFilterInfo.bikeVersion ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) => bike.version === this.partsFilterInfo.bikeVersion
              )
            )) &&
          (!this.partsFilterInfo.bikeManufacture ||
            product.productAttributes.some((attr) =>
              attr.bikes.some(
                (bike) =>
                  bike.manufacture === this.partsFilterInfo.bikeManufacture
              )
            ))
        );
      });
    } else if (this.partsFilterInfo.productType === 'ENGINE_OIL') {
      this.filteredProducts = this.products.filter((product) => {
        return (
          (!this.partsFilterInfo.engineOilCategorie ||
            product.category === this.partsFilterInfo.engineOilCategorie) &&
          (!this.partsFilterInfo.engineOilBrand ||
            product.manufacture === this.partsFilterInfo.engineOilBrand)
        );
      });
    } else if (this.partsFilterInfo.productType === 'BRAKE_OIL') {
      this.filteredProducts = this.products.filter((product) => {
        return (
          (!this.partsFilterInfo.brakeOilCategorie ||
            product.category === this.partsFilterInfo.brakeOilCategorie) &&
          (!this.partsFilterInfo.brakeOilBrand ||
            product.manufacture === this.partsFilterInfo.brakeOilBrand)
        );
      });
    } else if (this.partsFilterInfo.productType === 'LUBRICANT') {
      this.filteredProducts = this.products.filter((product) => {
        return (
          !this.partsFilterInfo.lubricantBrand ||
          product.manufacture === this.partsFilterInfo.lubricantBrand
        );
      });
    } else {
      this.filteredProducts = this.products;
    }

    console.log('Filtered Products:', this.filteredProducts);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  goToFirstPage(): void {
    this.changePage(1);
  }

  goToLastPage(): void {
    this.changePage(this.totalPages);
  }

  trackByProductId(index: number, product: ProductGet): number {
    return product.productId;
  }
}
