import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Product } from '../../../core/models/interface/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  category: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.loadProducts(this.category);
    });
  }
  loadProducts(category: string | null) {
    console.log('Loading products for category:', category);
  }

  products: Product[] = [
    {
      productId: 1,
      productName: 'Premium Engine Oil',
      productType: 'Engine Oil',
      quantity: '1L',
      category: 'Engine Oil',
      manufacture: 'OilCorp',
      itemDescription: 'High-performance engine oil for all types of engines.',
      activeState: true,
      averageRating: 4.7,
      pricePerUnit: 29.99,
      discount: 5.0,
      imageUrl: '/assets/product_img/product1.jpg',
      productAttributes: [
        {
          material: 'Synthetic',
          color: 'Amber',
          partNumber: 'EO12345',
          bikes: [
            {
              bikeId: 101,
              type: 'Sport',
              model: 'RSX300',
              version: '2024',
              manufacture: 'BikeMaker',
            },
            {
              bikeId: 102,
              type: 'Cruiser',
              model: 'CRZ500',
              version: '2023',
              manufacture: 'BikeMaker',
            },
          ],
        },
      ],
    },
    {
      productId: 2,
      productName: 'All-Season Tires',
      productType: 'Tires',
      quantity: '4 Pack',
      category: 'Tires',
      manufacture: 'TireCo',
      itemDescription:
        'Durable all-season tires with excellent grip and performance.',
      activeState: true,
      averageRating: 4.5,
      pricePerUnit: 199.99,
      discount: 20.0,
      imageUrl: '/assets/product_img/product1.jpg',
      productAttributes: [
        {
          material: 'Rubber',
          color: 'Black',
          partNumber: 'TIR78910',
          bikes: [
            {
              bikeId: 201,
              type: 'Adventure',
              model: 'ADV800',
              version: '2023',
              manufacture: 'RoadRider',
            },
          ],
        },
      ],
    },
    {
      productId: 3,
      productName: 'Hydraulic Brake Pads',
      productType: 'Brakes',
      quantity: '2 Pack',
      category: 'Brakes',
      manufacture: 'BrakePlus',
      itemDescription:
        'High-quality hydraulic brake pads for improved stopping power.',
      activeState: false,
      averageRating: 4.3,
      pricePerUnit: 49.99,
      discount: 10.0,
      imageUrl: '/assets/product_img/product1.jpg',
      productAttributes: [
        {
          material: 'Metal',
          color: 'Gray',
          partNumber: 'BRK11223',
          bikes: [
            {
              bikeId: 301,
              type: 'Mountain',
              model: 'MTX900',
              version: '2022',
              manufacture: 'TrailBlazer',
            },
          ],
        },
      ],
    },
    {
      productId: 3,
      productName: 'Hydraulic Brake Pads',
      productType: 'Brakes',
      quantity: '2 Pack',
      category: 'Brakes',
      manufacture: 'BrakePlus',
      itemDescription:
        'High-quality hydraulic brake pads for improved stopping power.',
      activeState: false,
      averageRating: 4.3,
      pricePerUnit: 49.99,
      discount: 10.0,
      imageUrl: '/assets/product_img/product1.jpg',
      productAttributes: [
        {
          material: 'Metal',
          color: 'Gray',
          partNumber: 'BRK11223',
          bikes: [
            {
              bikeId: 301,
              type: 'Mountain',
              model: 'MTX900',
              version: '2022',
              manufacture: 'TrailBlazer',
            },
          ],
        },
      ],
    },
    {
      productId: 3,
      productName: 'Hydraulic Brake Pads',
      productType: 'Brakes',
      quantity: '2 Pack',
      category: 'Brakes',
      manufacture: 'BrakePlus',
      itemDescription:
        'High-quality hydraulic brake pads for improved stopping power.',
      activeState: false,
      averageRating: 4.3,
      pricePerUnit: 49.99,
      discount: 10.0,
      imageUrl: '/assets/product_img/product1.jpg',
      productAttributes: [
        {
          material: 'Metal',
          color: 'Gray',
          partNumber: 'BRK11223',
          bikes: [
            {
              bikeId: 301,
              type: 'Mountain',
              model: 'MTX900',
              version: '2022',
              manufacture: 'TrailBlazer',
            },
          ],
        },
      ],
    },
    {
      productId: 3,
      productName: 'Hydraulic Brake Pads',
      productType: 'Brakes',
      quantity: '2 Pack',
      category: 'Brakes',
      manufacture: 'BrakePlus',
      itemDescription:
        'High-quality hydraulic brake pads for improved stopping power.',
      activeState: false,
      averageRating: 4.3,
      pricePerUnit: 49.99,
      discount: 10.0,
      imageUrl: '/assets/product_img/product1.jpg',
      productAttributes: [
        {
          material: 'Metal',
          color: 'Gray',
          partNumber: 'BRK11223',
          bikes: [
            {
              bikeId: 301,
              type: 'Mountain',
              model: 'MTX900',
              version: '2022',
              manufacture: 'TrailBlazer',
            },
          ],
        },
      ],
    },
  ];
}
