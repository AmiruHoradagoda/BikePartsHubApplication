import { Component, OnInit } from '@angular/core';
import { ProductSearchDetail } from '../../../../core/models/interface/ProductSearchDetail';
import { SearchBarService } from '../../../../shared/components/search-bar/search-bar.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent implements OnInit {
  products: ProductSearchDetail[] = [];
  searchInput: string = ''; // Initialize search input as an empty string

  constructor(private searchBarService: SearchBarService) {}

  ngOnInit(): void {
    this.searchProducts(this.searchInput); // Trigger initial search with empty input
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement?.value !== undefined) {
      this.searchInput = inputElement.value;
      this.searchProducts(this.searchInput);
    }
  }

  searchProducts(productName: string): void {
    this.searchBarService.searchProducts(productName).subscribe((result) => {
      this.products = result;
    });
  }
}
