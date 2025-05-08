// src/app/cart/cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../../core/models/interface/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> =
    this.cartItemsSubject.asObservable();

  constructor() {
    // Load cart items from storage on service initialization
    this.loadCartFromStorage();
  }

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private loadCartFromStorage(): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available in this environment');
      return;
    }

    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItemsSubject.next(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  }

  private saveCartToStorage(cart: CartItem[]): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  private updateCart(cart: CartItem[]): void {
    this.cartItemsSubject.next(cart);
    this.saveCartToStorage(cart);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: CartItem): void {
    const currentCart = this.getCartItems();
    const existingItemIndex = currentCart.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );

    if (existingItemIndex !== -1) {
      // Item already exists in cart, update quantity
      const updatedCart = [...currentCart];
      const newQuantity =
        updatedCart[existingItemIndex].quantity + item.quantity;
      updatedCart[existingItemIndex].quantity = newQuantity;
      this.updateCart(updatedCart);
    } else {
      // Add new item to cart
      this.updateCart([...currentCart, item]);
    }
  }

  updateCartItemQuantity(updatedItem: CartItem): void {
    const currentCart = this.getCartItems();
    const updatedCart = currentCart.map((item) =>
      item.productId === updatedItem.productId
        ? { ...item, quantity: updatedItem.quantity }
        : item
    );
    this.updateCart(updatedCart);
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.getCartItems().filter(
      (item) => item.productId !== productId
    );
    this.updateCart(updatedCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getTotalPrice(): number {
    return this.getCartItems().reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }

  getCartItemCount(): number {
    return this.getCartItems().reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
}
