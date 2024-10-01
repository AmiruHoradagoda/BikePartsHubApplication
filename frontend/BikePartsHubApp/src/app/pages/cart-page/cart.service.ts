import { Injectable } from '@angular/core';
import { CartItem } from '../../core/models/interface/CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.loadCartItemsFromStorage()
  );

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartItemsFromStorage(); // Load initial data from localStorage when the service is created
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(
      (i) => i.productId === item.productId
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Save to localStorage
  }
  // Method to update only the quantity of an item in the cart
  updateCartItemQuantity(item: CartItem) {
    const existingItem = this.cartItems.find(
      (i) => i.productId === item.productId
    );
    if (existingItem) {
      existingItem.quantity = item.quantity; // Update the quantity
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Persist changes to localStorage
  }
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Save to localStorage
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Save to localStorage
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }

  private saveCartItemsToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartItemsFromStorage(): CartItem[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
}