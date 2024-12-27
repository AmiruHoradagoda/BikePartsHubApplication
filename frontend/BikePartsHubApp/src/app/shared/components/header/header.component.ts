import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { NavComponent } from "../nav/nav.component";
import { CartItem } from '../../../core/models/interface/CartItem';
import { CartService } from '../../../pages/cart-page/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
selectProduct(_t11: any) {
throw new Error('Method not implemented.');
}
  cartItemCount = 0; // Variable to hold the count of cart items

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    // Subscribe to cartItems$ observable to get real-time updates
    this.cartService.cartItems$.subscribe((items: CartItem[]) => {
      this.cartItemCount = items.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Update the count
    });
  }
}
