// src/app/user/pages/checkout-page/checkout-page.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  paymentMethod: 'paypal' | 'cash_on_delivery' = 'paypal';
  isSubmitting: boolean = false;
  private readonly paypalCurrency = 'USD';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
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
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.handlePaypalReturn();
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

  onPaymentMethodChange(method: 'paypal' | 'cash_on_delivery'): void {
    this.paymentMethod = method;
  }

  updatePaymentValidation(): void {
    // Kept for backward compatibility with the current component lifecycle.
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

      if (this.paymentMethod === 'paypal') {
        await this.startPaypalCheckout(orderData);
        return;
      }

      orderData.payment = this.createCashOnDeliveryPayment();

      // Call the checkout service to save the order
      const result = await this.checkoutService.saveOrder(orderData);

      this.completeSuccessfulOrder(orderData, this.paymentMethod);
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
      payment: null,
    };
  }

  generateOrderNumber(): string {
    // Generate a random order number
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  private async startPaypalCheckout(orderData: any): Promise<void> {
    const returnUrl = `${window.location.origin}/user/checkout`;
    this.checkoutService.storePendingPaypalOrder(orderData);

    const payment = await this.checkoutService.createPaypalPayment({
      total: this.total,
      currency: this.paypalCurrency,
      description: `BikePartsHub order payment - ${this.generateOrderNumber()}`,
      cancelUrl: `${returnUrl}?paypalCancel=true`,
      successUrl: returnUrl,
    });

    if (!payment.approvalUrl) {
      throw new Error('PayPal approval URL was not returned.');
    }

    window.location.href = payment.approvalUrl;
  }

  private async handlePaypalReturn(): Promise<void> {
    const paymentId = this.route.snapshot.queryParamMap.get('paymentId');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');
    const paypalCancelled =
      this.route.snapshot.queryParamMap.get('paypalCancel') === 'true';

    if (paypalCancelled) {
      this.checkoutService.clearPendingPaypalOrder();
      this.notificationService.showError('PayPal payment was cancelled.');
      this.router.navigate(['/user/checkout']);
      return;
    }

    if (!paymentId || !payerId) {
      return;
    }

    const pendingOrder = this.checkoutService.getPendingPaypalOrder();
    if (!pendingOrder) {
      this.notificationService.showError(
        'Pending PayPal order not found. Please checkout again.'
      );
      this.router.navigate(['/user/cart']);
      return;
    }

    this.isSubmitting = true;

    try {
      const paypalResult = await this.checkoutService.executePaypalPayment({
        paymentId,
        payerId,
      });

      if (paypalResult.state !== 'approved') {
        throw new Error(`PayPal payment was not approved: ${paypalResult.state}`);
      }

      pendingOrder.payment = this.createPaypalPaymentRecord(paypalResult.paymentId);
      await this.checkoutService.saveOrder(pendingOrder);
      this.checkoutService.clearPendingPaypalOrder();
      this.completeSuccessfulOrder(pendingOrder, 'paypal');
    } catch (error: any) {
      this.notificationService.showError(
        error.message || 'PayPal payment failed. Please try again.'
      );
      console.error('PayPal return handling error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private completeSuccessfulOrder(orderData: any, paymentMethod: string): void {
    this.cartService.clearCart();
    this.notificationService.showSuccess('Order placed successfully!');
    this.router.navigate(['/user/order-confirmation'], {
      state: {
        orderNumber: this.generateOrderNumber(),
        total: orderData.total,
        paymentMethod,
      },
    });
  }

  private createPaypalPaymentRecord(transactionReference: string): any {
    return {
      method: 'PAYPAL',
      status: 'PAID',
      transactionReference,
      paidAt: new Date().toISOString(),
    };
  }

  private createCashOnDeliveryPayment(): any {
    return {
      method: 'CASH_ON_DELIVERY',
      status: 'PENDING',
      transactionReference: `COD-${Date.now()}`,
      paidAt: null,
    };
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
    }

    return 'Invalid input';
  }
}
