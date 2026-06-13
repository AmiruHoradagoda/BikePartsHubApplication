import { Component, Input, OnInit } from '@angular/core';

interface Product {
  name: string;
  imageUrl: string;
  discount: number;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  inventoryStatus: string;
}

@Component({
  selector: 'app-popular-product-section',
  templateUrl: './popular-product-section.component.html',
  styleUrls: ['./popular-product-section.component.scss'],
})
export class PopularProductSectionComponent implements OnInit {
  @Input() scrollFadeDelay: number = 0;
  ngOnInit(): void {
  }
  hotDeals: Product[] = [
    {
      name: 'Premium Chain Set',
      imageUrl:
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 25,
      rating: 4.5,
      reviewCount: 128,
      originalPrice: 199.99,
      discountedPrice: 149.99,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Performance Brake Pads',
      imageUrl:
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 30,
      rating: 4.8,
      reviewCount: 95,
      originalPrice: 89.99,
      discountedPrice: 62.99,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Racing Oil Filter',
      imageUrl:
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 20,
      rating: 4.6,
      reviewCount: 156,
      originalPrice: 29.99,
      discountedPrice: 23.99,
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Sport Exhaust System',
      imageUrl:
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      discount: 15,
      rating: 4.9,
      reviewCount: 78,
      originalPrice: 599.99,
      discountedPrice: 509.99,
      inventoryStatus: 'INSTOCK',
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  generateStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(0)
      .map((_, index) => index < rating);
  }
}
