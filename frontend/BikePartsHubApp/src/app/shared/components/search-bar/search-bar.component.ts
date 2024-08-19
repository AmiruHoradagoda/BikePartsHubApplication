import { Component } from '@angular/core';
import { SearchBarService } from './search-bar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchResults: any[] = [];
  searchTerm: string = '';
  isDropdownVisible: boolean = false;

  constructor(private searchBarService: SearchBarService) {}

  onSearchChange() {
    if (this.searchTerm) {
      this.searchBarService.searchProducts(this.searchTerm).subscribe(
        (data) => {
          console.log('Fetched Data:', data); 
          this.searchResults = data;
          this.isDropdownVisible = true;
        },
        (error) => {
          console.error('Error fetching data:', error); 
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
