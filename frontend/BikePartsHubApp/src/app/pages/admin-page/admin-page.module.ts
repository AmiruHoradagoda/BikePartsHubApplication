import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSideNavbarComponent } from './admin-side-navbar/admin-side-navbar.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { RouterModule } from '@angular/router';
import { AdminProductCardComponent } from './admin-products/admin-product-card/admin-product-card.component';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminOverviewComponent,
    AdminSideNavbarComponent,
    AdminProductCardComponent,
    AdminProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AdminPageModule {}
