import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartItem } from '../../../core/models/interface/CartItem';
import { AuthenticationResponse } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../pages/cart-page/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ProductSearchDetail } from '../../../core/models/interface/ProductSearchDetail';
import { SearchBarService } from '../search-bar/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  // Cart and user properties
  cartItemCount = 0;
  currentUser: AuthenticationResponse | null = null;

  // Search properties
  searchResults: ProductSearchDetail[] = [];
  searchTerm: string = '';
  isDropdownVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private searchBarService: SearchBarService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Subscribe to cart items
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

    // Subscribe to current user
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error getting current user:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Desktop dropdown - already handled by CSS hover, but adding for backup
      const productsButton = document.querySelector('.group > button');
      const dropdownNavbar = document.getElementById('dropdownNavbar');

      if (productsButton && dropdownNavbar) {
        productsButton.addEventListener('click', () => {
          dropdownNavbar.classList.toggle('hidden');
        });
      }

      // Mobile menu toggle
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');

      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
      }

      // Mobile products dropdown
      const mobileProductsButton = document.getElementById(
        'mobile-products-button'
      );
      const mobileProductsMenu = document.getElementById(
        'mobile-products-menu'
      );

      if (mobileProductsButton && mobileProductsMenu) {
        mobileProductsButton.addEventListener('click', () => {
          mobileProductsMenu.classList.toggle('hidden');
          mobileProductsMenu.classList.toggle('show');
        });
      }
    }
  }

  // Search methods
  onSearchChange(): void {
    if (this.searchTerm) {
      this.searchBarService.searchProducts(this.searchTerm).subscribe(
        (data: ProductSearchDetail[]) => {
          this.searchResults = data;
          this.isDropdownVisible = true;
        },
        (error) => {
          console.error('Error fetching search results:', error);
          this.isDropdownVisible = false;
        }
      );
    } else {
      this.isDropdownVisible = false;
    }
  }

  hideDropdown(): void {
    this.isDropdownVisible = false;
  }
}
