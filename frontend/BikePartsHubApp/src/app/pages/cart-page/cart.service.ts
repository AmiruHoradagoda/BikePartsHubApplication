import { Injectable } from '@angular/core';
import { CartItem } from '../../core/models/interface/CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartItemsFromStorage());

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.cartItems = this.loadCartItemsFromStorage();
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Update quantity if item already exists
    } else {
      this.cartItems.push(item); // Add new item to cart
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Save to localStorage
  }

  updateCartItemQuantity(item: CartItem): void {
    const existingItem = this.cartItems.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity = item.quantity; // Update the quantity
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Persist changes to localStorage
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Save to localStorage
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(); // Save to localStorage
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  private saveCartItemsToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  private loadCartItemsFromStorage(): CartItem[] {
    if (typeof localStorage !== 'undefined') {
      const storedItems = localStorage.getItem('cartItems');
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  }
}