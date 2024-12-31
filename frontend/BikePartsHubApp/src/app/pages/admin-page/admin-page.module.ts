import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSideNavbarComponent } from './components/admin-side-navbar/admin-side-navbar.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductCardComponent } from './components/admin-products/admin-product-card/admin-product-card.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminOverviewComponent,
    AdminSideNavbarComponent,
    AdminProductCardComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AdminPageModule {}
