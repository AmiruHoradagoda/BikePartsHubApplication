// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-nav',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './nav.component.html',
//   styleUrl: './nav.component.css',
// })
// export class NavComponent {}

import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Desktop dropdown
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
    const mobileProductsButton = document.getElementById('mobile-products-button');
    const mobileProductsMenu = document.getElementById('mobile-products-menu');

    if (mobileProductsButton && mobileProductsMenu) {
      mobileProductsButton.addEventListener('click', () => {
        mobileProductsMenu.classList.toggle('hidden');
      });
    }
  }
}

