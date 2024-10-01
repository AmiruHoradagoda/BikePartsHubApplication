import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartItem } from '../../core/models/interface/CartItem';
import { CartService } from './cart.service';
import { ProductGet } from '../../core/models/interface/Product';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
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

  onChangeQuantity(item: CartItem, delta: number) {
    const newQuantity = item.quantity + delta;

    // Remove item if quantity goes to 0 or less
    if (newQuantity <= 0) {
      this.onRemoveItem(item.productId);
    } else {
      item.quantity = newQuantity;
      this.cartService.updateCartItemQuantity(item);
    }
  }
}


  