// src/app/user/pages/product-page/components/product-details/product-details.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductGet } from '../../../../../core/models/interface/Product';
import { NotificationService } from '../../../../components/notification/notification.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: ProductGet; // Using the definite assignment assertion operator
  @Input() visible: boolean = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() addToCartEvent = new EventEmitter<{
    product: ProductGet;
    quantity: number;
  }>();
  @Output() buyNowEvent = new EventEmitter<{
    product: ProductGet;
    quantity: number;
  }>();

  selectedQuantity: number = 1;
  selectedTab: 'description' | 'specifications' | 'reviews' = 'description';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Reset quantity when modal is opened
    this.selectedQuantity = 1;
  }

  close(): void {
    this.closeModal.emit();
  }

  increaseQuantity(): void {
    if (this.selectedQuantity < this.product.quantity) {
      this.selectedQuantity++;
    } else {
      this.notificationService.showWarning(
        `Sorry, only ${this.product.quantity} units available in stock.`
      );
    }
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  addToCart(): void {
    if (this.product.quantity <= 0) {
      this.notificationService.showError(
        'Sorry, this product is out of stock.'
      );
      return;
    }

    this.addToCartEvent.emit({
      product: this.product,
      quantity: this.selectedQuantity,
    });

    this.notificationService.showSuccess(
      `${this.selectedQuantity} ${this.product.productName} added to cart!`
    );
  }

  buyNow(): void {
    if (this.product.quantity <= 0) {
      this.notificationService.showError(
        'Sorry, this product is out of stock.'
      );
      return;
    }

    this.buyNowEvent.emit({
      product: this.product,
      quantity: this.selectedQuantity,
    });
  }

  setTab(tab: 'description' | 'specifications' | 'reviews'): void {
    this.selectedTab = tab;
  }

  // Helper method to check if stock is low (less than 5 items)
  isLowStock(): boolean {
    return this.product.quantity > 0 && this.product.quantity < 5;
  }

  // Handle click outside of modal to close it
  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
