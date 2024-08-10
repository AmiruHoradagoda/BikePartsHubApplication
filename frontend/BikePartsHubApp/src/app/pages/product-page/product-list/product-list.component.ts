import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../../core/models/interface/Product';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { NgIf, NgFor } from '@angular/common'; // Add NgIf and NgFor for @if and @for

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'], // Note: 'styleUrl' should be 'styleUrls'
  imports: [ProductCardComponent, NgIf, NgFor], // Add NgIf and NgFor here
})
export class ProductListComponent implements OnInit {
  category: string | null = null;
  products: Product[] = [];

  partProducts: Product[] = [];
  bodyPartProducts: Product[] = [];
  enginOilProducts: Product[] = [];
  brakeOilProducts: Product[] = [];
  lubricantProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
    });

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    for (const product of this.products) {
      switch (product.productType) {
        case 'PARTS':
          this.partProducts.push(product);
          break;
        case 'BODY_PARTS':
          this.bodyPartProducts.push(product);
          break;
        case 'ENGINE_OIL':
          this.enginOilProducts.push(product);
          break;
        case 'BRAKE_OIL':
          this.brakeOilProducts.push(product);
          break;
        case 'LUBRICANT':
          this.lubricantProducts.push(product);
          break;
        default:
          break;
      }
    }
  }
}
