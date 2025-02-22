import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../core/models/interface/CartItem';
import { AuthenticationResponse } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../pages/cart-page/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  currentUser: AuthenticationResponse | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (items: CartItem[]) => {
        this.cartItemCount = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
      error: (error) => {
        console.error('Error getting cart items:', error);
      },
    });

    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error getting current user:', error);
      },
    });
  }
}
