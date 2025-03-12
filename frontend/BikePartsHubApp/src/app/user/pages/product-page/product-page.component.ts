import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  productType: string | null = null;
  partsFilterInfo: {
    partCategorie?: string;
    partBrand?: string;
    bodyPartsCategorie?: string;
    bodyPartsBrand?: string;
    bodyPartsColor?: string;
    engineOilCategorie?: string;
    engineOilBrand?: string;
    brakeOilCategorie?: string;
    brakeOilBrand?: string;
    lubricantBrand?: string;
    bikeType?: string;
    bikeModel?: string;
    bikeVersion?: string;
    bikeManufacture?: string;
  } = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category');
      switch (category?.toUpperCase()) {
        case 'PARTS':
          this.productType = 'Parts';
          break;
        case 'BODY_PARTS':
          this.productType = 'Body Parts';
          break;
        case 'ENGINE_OIL':
          this.productType = 'Engine Oil';
          break;
        case 'BRAKE_OIL':
          this.productType = 'Brake Oil';
          break;
        case 'LUBRICANTS':
          this.productType = 'Lubricants';
          break;
        default:
          this.productType = category;
      }
    });
  }

  receivePartsFilterInfo($event: {
    partCategorie?: string;
    partBrand?: string;
    bodyPartsCategorie?: string;
    bodyPartsBrand?: string;
    bodyPartsColor?: string;
    engineOilCategorie?: string;
    engineOilBrand?: string;
    brakeOilCategorie?: string;
    brakeOilBrand?: string;
    lubricantBrand?: string;
    bikeType?: string;
    bikeModel?: string;
    bikeVersion?: string;
    bikeManufacture?: string;
  }) {
    this.partsFilterInfo = $event;
    console.log('Received partsFilterInfo from sidebar:', this.partsFilterInfo);
  }
}
