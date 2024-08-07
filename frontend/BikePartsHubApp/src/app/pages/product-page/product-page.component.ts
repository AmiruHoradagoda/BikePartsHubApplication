import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductListComponent,FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  category: string | null = null;
  manufacturer?: string;
  type?: string;
  model?: string;
  version?: string;
  categoryType?: string;
  brand?: string;
  color?: string;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.loadProducts(this.category);
    });
  }
  loadProducts(category: string | null) {
    // Logic to load products based on the category
    console.log('Loading products for category:', category);
  }
}
