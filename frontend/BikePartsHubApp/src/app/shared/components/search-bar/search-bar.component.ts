import { Component } from '@angular/core';
import { SearchBarService } from './search-bar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductSearchDetail } from '../../../core/models/interface/ProductSearchDetail';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchResults: ProductSearchDetail[] = [];
  searchTerm: string = '';
  isDropdownVisible: boolean = false;

  constructor(private searchBarService: SearchBarService) {}

  onSearchChange() {
    if (this.searchTerm) {
      this.searchBarService.searchProducts(this.searchTerm).subscribe(
        (data: ProductSearchDetail[]) => {
          this.searchResults = data;
          this.isDropdownVisible = true;
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.isDropdownVisible = false;
        }
      );
    } else {
      this.isDropdownVisible = false;
    }
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }
}
