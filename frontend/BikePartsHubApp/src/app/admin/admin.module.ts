import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminSideNavbarComponent } from './components/admin-side-navbar/admin-side-navbar.component';
import { AdminProductCardComponent } from './components/admin-products/admin-product-card/admin-product-card.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminComponent } from './admin.component';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminOverviewComponent,
    AdminSideNavbarComponent,
    AdminProductCardComponent,
    AdminProductsComponent,
    ProductFormComponent,
    AdminUsersComponent,
    AdminHeaderComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    AuthAdminModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [AdminComponent, AdminSideNavbarComponent],
})
export class AdminModule {}
