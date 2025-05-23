import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminOrderViewComponent } from './components/admin-order/admin-order-view/admin-order-view.component';
import { AdminCustomerViewComponent } from './components/admin-users/admin-customer-view/admin-customer-view.component';
import { ProfileComponent } from './components/admin-users/components/profile/profile.component';
import { OrdersComponent } from './components/admin-users/components/orders/orders.component';
import { SchedulesComponent } from './components/admin-users/components/schedules/schedules.component';
import { OrderViewComponent } from './components/admin-users/components/orders/order-view/order-view.component';
import { SchedulesViewComponent } from './components/admin-users/components/schedules/schedules-view/schedules-view.component';
import { AdminSchedulesComponent } from './components/admin-schedules/admin-schedules.component';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';
import { AdminServicesComponent } from './components/admin-services/admin-services.component';
import { ServiceFormComponent } from './components/admin-services/service-form/service-form.component';
import { AdminScheduleViewComponent } from './components/admin-schedules/admin-schedule-view/admin-schedule-view.component';

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
    AdminOrderComponent,
    AdminOrderViewComponent,
    AdminCustomerViewComponent,
    ProfileComponent,
    OrdersComponent,
    SchedulesComponent,
    OrderViewComponent,
    SchedulesViewComponent,
    AdminSchedulesComponent,
    AdminMessagesComponent,
    AdminServicesComponent,
    ServiceFormComponent,
    AdminScheduleViewComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    AuthAdminModule,
    ReactiveFormsModule,
  ],
  exports: [AdminComponent, AdminSideNavbarComponent],
})
export class AdminModule {}
