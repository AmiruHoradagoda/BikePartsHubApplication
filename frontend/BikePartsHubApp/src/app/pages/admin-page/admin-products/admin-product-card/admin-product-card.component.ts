import { Component, Input } from '@angular/core';
import { ProductSearchDetail } from '../../../../core/models/interface/ProductSearchDetail';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-product-card',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './admin-product-card.component.html',
  styleUrl: './admin-product-card.component.css',
})
export class AdminProductCardComponent {
  @Input({ required: true }) product!: ProductSearchDetail;
}
