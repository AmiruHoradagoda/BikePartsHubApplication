// src/app/user/pages/product-page/components/product-list/product-list.component.ts

import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ProductListService } from './product-list.service';
import { ProductGet } from '../../../../../core/models/interface/Product';
import { CartItem } from '../../../../../core/models/interface/CartItem';
import { NotificationService } from '../../../../components/notification/notification.service';
import { CartService } from '../../../cart-page/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges {
  products: ProductGet[] = [];
  filteredProducts: ProductGet[] = [];
  selectedProduct: ProductGet | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 9;

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
  role: string | undefined | null = null;
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productListService: ProductListService,
    private cartService: CartService,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Only attempt to access localStorage in browser environment
    if (this.isBrowser) {
      try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          this.role = JSON.parse(currentUser).role;
        }
      } catch (error) {
        console.warn('Error accessing localStorage:', error);
      }
    }

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
    let itemCategory, itemBrand;

    if (this.productType === 'PARTS') {
      itemCategory = this.partsFilterInfo.partCategorie;
      itemBrand = this.partsFilterInfo.partBrand;
    } else if (this.productType === 'BODY_PARTS') {
      itemCategory = this.partsFilterInfo.bodyPartsCategorie;
      itemBrand = this.partsFilterInfo.bodyPartsBrand;
    } else if (this.productType === 'ENGINE_OIL') {
      itemCategory = this.partsFilterInfo.engineOilCategorie;
      itemBrand = this.partsFilterInfo.engineOilBrand;
    } else if (this.productType === 'BRAKE_OIL') {
      itemBrand = this.partsFilterInfo.brakeOilBrand;
    } else if (this.productType === 'LUBRICANT') {
      itemBrand = this.partsFilterInfo.lubricantBrand;
    }

    this.productListService
      .getProducts(
        itemCategory,
        this.productType,
        itemBrand,
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

  changePage(page: number | string): void {
    // If page is ellipsis ('...'), do nothing
    if (page === '...') return;

    // Convert to number if needed and validate
    const pageNumber = Number(page);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadProducts();
    }
  }

  getPageRange(): (number | string)[] {
    const range: (number | string)[] = [];
    const maxVisiblePages = 5; // Adjust this number to show more or fewer page numbers

    if (this.totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        range.push(i);
      }
    } else {
      // Always show first page
      range.push(1);

      if (this.currentPage <= 3) {
        // If current page is near the start
        range.push(2, 3, 4, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // If current page is near the end
        range.push(
          '...',
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        );
      } else {
        // If current page is in the middle
        range.push(
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.totalPages
        );
      }
    }

    return range;
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

  // Methods for handling product selection and modal
  selectProduct(product: ProductGet): void {
    this.selectedProduct = product;
  }

  closeProductDetails(): void {
    this.selectedProduct = null;
  }

  // Handle Add to Cart event from ProductDetailsComponent
  handleAddToCart(event: { product: ProductGet; quantity: number }): void {
    const { product, quantity } = event;

    const cartItem: CartItem = {
      productId: product.productId,
      name: product.productName,
      description: product.itemDescription || '',
      imageUrl: product.imageUrl,
      unitPrice: product.pricePerUnit,
      quantity: quantity,
    };

    this.cartService.addToCart(cartItem);

    // Show success message
    this.notificationService.showSuccess(
      `${quantity} ${product.productName} added to cart`
    );

    // Close the product details modal
    this.closeProductDetails();
  }

  // Handle Buy Now event from ProductDetailsComponent
  handleBuyNow(event: { product: ProductGet; quantity: number }): void {
    // First add to cart
    this.handleAddToCart(event);

    // Then navigate to checkout
    this.router.navigate(['/cart']);
  }
}
