import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../cart-page/cart.service';
import { ProductGet } from '../../../../../core/models/interface/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: ProductGet;
  @Input({ required: true }) role: string | undefined;

  @Output() productClicked = new EventEmitter<ProductGet>();
  @Output() addToCart = new EventEmitter<ProductGet>();

  constructor(private cartService: CartService) {}

  openProductDetails(product: ProductGet) {
    this.productClicked.emit(product);
  }

  onAddToCart() {
    const price =
      this.role === 'LOYAL_CUSTOMER' && this.product.discount > 0
        ? this.calculateDiscountedPrice(
            this.product.pricePerUnit,
            this.product.discount
          )
        : this.product.pricePerUnit;

    const cartItem = {
      productId: this.product.productId,
      name: this.product.productName,
      description: this.product.itemDescription,
      quantity: 1, // default to 1 for each click
      unitPrice: price,
      imageUrl: this.product.imageUrl,
    };
    this.cartService.addToCart(cartItem);
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price - price * (discountPercentage / 100);
  }
}
