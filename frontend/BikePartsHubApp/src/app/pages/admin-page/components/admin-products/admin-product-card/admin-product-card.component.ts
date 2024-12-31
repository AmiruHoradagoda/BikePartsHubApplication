import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { ProductSearchDetail } from '../../../../../core/models/interface/ProductSearchDetail';
import { ProductService } from '../../../../../shared/services/product.service';

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.css'], // Fixed typo from styleUrl to styleUrls
})
export class AdminProductCardComponent {
  @Input({ required: true }) product!: ProductSearchDetail;

  constructor(
    private productService: ProductService, // Inject ProductService
    private toastr: ToastrService // Inject ToastrService for notifications
  ) {}

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.toastr.success('Product deleted successfully');
        // You may also want to emit an event or handle navigation to update the UI
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.toastr.error('Failed to delete product');
      }
    );
  }
}
