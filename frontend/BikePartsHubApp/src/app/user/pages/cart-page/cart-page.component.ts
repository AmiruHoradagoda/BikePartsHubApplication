import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from './cart.service';
import { CartItem } from '../../../core/models/interface/CartItem';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
      console.log('Cart Items in cart page:', this.cartItems);
    });
  }

  onRemoveItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  onEmptyCart() {
    this.cartService.clearCart();
  }

  onChangeQuantity(item: CartItem, change: number): void {
    const updatedQuantity = item.quantity + change;
    if (updatedQuantity > 0) {
      const updatedItem = { ...item, quantity: updatedQuantity };
      this.cartService.updateCartItemQuantity(updatedItem);
    } else {
      this.cartService.removeFromCart(item.productId);
    }
  }
  private calculateTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}


  