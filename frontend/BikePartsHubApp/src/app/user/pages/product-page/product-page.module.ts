import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPageComponent } from './product-page.component';
import { FormsModule } from '@angular/forms';
import { ProductFilterSidebarComponent } from './components/product-filter-sidebar/product-filter-sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductPageComponent,
    ProductFilterSidebarComponent,
    ProductCardComponent,
    ProductDetailsComponent,
  ],
  imports: [FormsModule, CommonModule],
})
export class ProductPageModule {}
