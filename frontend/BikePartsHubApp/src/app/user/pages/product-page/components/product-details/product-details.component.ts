import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  isLoading = true;
  currentImageIndex = 0;

  // Mock product data - replace with your actual data
  product = {
    imageUrl:
      'https://lasercutting-vietnam.com/wp-content/uploads/2024/03/Motorbike-part-industry.jpg',
    name: 'MOTUL 10W40 Engine Oil',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  };

  ngOnInit() {
    // Initialize component
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
    this.isLoading = true;
  }
}
