import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterSidebarComponent } from './product-filter-sidebar/product-filter-sidebar.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  imports: [ProductListComponent, ProductFilterSidebarComponent],
})
export class ProductPageComponent implements OnInit {
  category: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
    });
  }
}
