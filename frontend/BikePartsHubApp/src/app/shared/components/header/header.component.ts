import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CartItem } from '../../../core/models/interface/CartItem';
import { CartService } from '../../../pages/cart-page/cart.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0; // Variable to hold the count of cart items
  userFirstName: string | null = null;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
     this.authService.user$.subscribe((user) => {
       this.userFirstName = user ? user.firstName : null;
     });
    // Subscribe to cartItems$ observable to get real-time updates
    this.cartService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItemCount = items.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Update the count
    });
    console.log(this.userFirstName);
  }
}
