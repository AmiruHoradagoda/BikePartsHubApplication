// src/app/user/pages/checkout-page/checkout-page.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../../../core/models/interface/CartItem';
import { CheckoutService } from './checkout.service';
import { NotificationService } from '../../components/notification/notification.service';
import { CartService } from '../cart-page/cart.service';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 60;
  tax: number = 60;
  total: number = 0;
  paymentMethod: 'credit_card' | 'paypal' | 'cash_on_delivery' = 'credit_card';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private notificationService: NotificationService,
    private checkoutService: CheckoutService,
    private authService: AuthService
  ) {
    this.checkoutForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      // Shipping Address - these fields will be transformed for the backend
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],

      // Payment Information
      cardNumber: [''],
      cardName: [''],
      expiryDate: [''],
      cvv: [''],

      // Additional Information
      saveInfo: [false],
      notes: [''],
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadCartItems();
    this.calculateTotals();
    this.updatePaymentValidation();

    // Pre-fill user information if available
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (currentUser.firstName) {
        this.checkoutForm.get('firstName')?.setValue(currentUser.firstName);
      }
      if (currentUser.lastName) {
        this.checkoutForm.get('lastName')?.setValue(currentUser.lastName);
      }
      if (currentUser.email) {
        this.checkoutForm.get('email')?.setValue(currentUser.email);
      }
    }
  }

  loadCartItems(): void {
    this.cartService.cartItems$.pipe(take(1)).subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotals();
      },
      (error) => {
        this.notificationService.showError(
          'Failed to load cart items. Please try again.'
        );
      }
    );
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getTotalPrice();
    // Fixed shipping and tax for now
    this.shipping = 60;
    this.tax = 60;
    this.total = this.subtotal + this.shipping + this.tax;
  }

  onPaymentMethodChange(
    method: 'credit_card' | 'paypal' | 'cash_on_delivery'
  ): void {
    this.paymentMethod = method;
    this.updatePaymentValidation();
  }

  updatePaymentValidation(): void {
    const cardFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];

    if (this.paymentMethod === 'credit_card') {
      // Add validators for credit card fields
      this.checkoutForm
        .get('cardNumber')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{16}$'),
        ]);
      this.checkoutForm.get('cardName')?.setValidators([Validators.required]);
      this.checkoutForm
        .get('expiryDate')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/[0-9]{2}$'),
        ]);
      this.checkoutForm
        .get('cvv')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{3,4}$'),
        ]);
    } else {
      // Remove validators for credit card fields
      cardFields.forEach((field) => {
        this.checkoutForm.get(field)?.clearValidators();
        this.checkoutForm.get(field)?.updateValueAndValidity();
      });
    }

    // Update form validity
    cardFields.forEach((field) => {
      this.checkoutForm.get(field)?.updateValueAndValidity();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.checkoutForm.controls).forEach((key) => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
      this.notificationService.showError(
        'Please fill in all required fields correctly.'
      );
      return;
    }

    if (this.cartItems.length === 0) {
      this.notificationService.showError(
        'Your cart is empty. Please add items before checkout.'
      );
      return;
    }

    this.isSubmitting = true;

    try {
      // Get current user
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      // Prepare order data
      const orderData = this.prepareOrderData(currentUser.userId);

      // Call the checkout service to save the order
      const result = await this.checkoutService.saveOrder(orderData);

      // Clear cart after successful order
      this.cartService.clearCart();

      // Show success notification
      this.notificationService.showSuccess('Order placed successfully!');

      // Navigate to order confirmation page
      this.router.navigate(['/order-confirmation'], {
        state: {
          orderId: result.id,
        },
      });
    } catch (error: any) {
      this.notificationService.showError(
        error.message || 'Failed to place order. Please try again.'
      );
      console.error('Order submission error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  prepareOrderData(userId: number): any {
    const formValue = this.checkoutForm.value;

    // Format order items as per OrderDetailRequestDto
    const orderDetails = this.cartItems.map((item) => ({
      productName: item.name,
      qty: item.quantity,
      amount: item.unitPrice,
      productId: item.productId,
    }));

    // Format shipping address as per ShippingAddressRequestDto
    const shippingAddress = {
      address: formValue.address,
      city: formValue.city,
      state: formValue.state,
      district: formValue.state, // We don't have district in the form, so using state
      postalCode: formValue.postalCode,
    };

    // Format order data as per OrderSaveRequestDto
    return {
      userId: userId,
      orderDate: new Date(),
      total: this.total,
      orderDetails: orderDetails,
      shippingAddress: shippingAddress,
    };
  }

  generateOrderNumber(): string {
    // Generate a random order number
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  // Helper methods for form validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (!field) return '';

    if (field.errors?.['required']) return 'This field is required';
    if (field.errors?.['email']) return 'Please enter a valid email address';
    if (field.errors?.['pattern']) {
      if (fieldName === 'phone')
        return 'Please enter a valid 10-digit phone number';
      if (fieldName === 'postalCode')
        return 'Please enter a valid 5-digit postal code';
      if (fieldName === 'cardNumber')
        return 'Please enter a valid 16-digit card number';
      if (fieldName === 'expiryDate')
        return 'Please enter a valid expiry date (MM/YY)';
      if (fieldName === 'cvv')
        return 'Please enter a valid CVV code (3-4 digits)';
    }

    return 'Invalid input';
  }
}
