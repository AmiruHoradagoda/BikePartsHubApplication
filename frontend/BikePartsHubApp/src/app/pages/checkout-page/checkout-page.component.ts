// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../cart-page/cart.service';
import { CartItem } from '../../core/models/interface/CartItem';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  total = 0;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        address: ['', Validators.required],
        state: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{5}$')],
        ],
      }),
    });
  }

  ngOnInit() {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.cartItems$.pipe(take(1)).subscribe(
      (items) => {
        this.cartItems = items;
        this.total = this.cartService.getTotalPrice();
      },
      (error) => {
        this.error = 'Failed to load cart items';
      }
    );
  }

  async handleCheckout() {
    if (this.checkoutForm.valid && this.authService.currentUserValue) {
      this.loading = true;
      const orderData = {
        userId: this.authService.currentUserValue.userId,
        orderDate: new Date(),
        total: this.total,
        orderDetails: this.cartItems.map((item) => ({
          productName: item.name,
          qty: item.quantity,
          amount: item.unitPrice,
          productId: item.productId,
        })),
        shippingAddress: this.checkoutForm.get('shippingAddress')?.value,
      };

      try {
        const result = await this.checkoutService.saveOrder(orderData);
        await this.cartService.clearCart();
        this.router.navigate(['/order-confirmation'], {
          state: { orderId: result.id },
        });
      } catch (error: any) {
        this.error = error.message || 'Failed to process order';
      } finally {
        this.loading = false;
      }
    }
  }
}
