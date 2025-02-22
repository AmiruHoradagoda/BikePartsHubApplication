import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../cart-page/cart.service';
import { ProductGet } from '../../../../../core/models/interface/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: ProductGet;

  @Output() productClicked = new EventEmitter<ProductGet>();

  @Output() addToCart = new EventEmitter<ProductGet>();

  constructor(private cartService: CartService) {}

  openProductDetails(product: ProductGet) {
    this.productClicked.emit(product);
  }

  onAddToCart() {
    const cartItem = {
      productId: this.product.productId,
      name: this.product.productName,
      description: this.product.itemDescription,
      quantity: 1, // default to 1 for each click
      unitPrice: this.product.pricePerUnit,
      imageUrl: this.product.imageUrl,
    };
    this.cartService.addToCart(cartItem);
  }
}
