import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminComponent } from './admin.component';
import { LoginAdminComponent } from './auth-admin/login-admin/login-admin.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminCustomerViewComponent } from './components/admin-users/admin-customer-view/admin-customer-view.component';
import { AdminSchedulesComponent } from './components/admin-schedules/admin-schedules.component';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';

const routes: Routes = [
  {
    path: 'login-admin',
    component: LoginAdminComponent,
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: AdminOverviewComponent,
      },
      {
        path: 'customer-view/:id',
        component: AdminCustomerViewComponent,
      },
      {
        path: 'product',
        component: AdminProductsComponent,
      },
      {
        path: 'add-product',
        component: ProductFormComponent,
      },
      {
        path: 'update-product/:id',
        component: ProductFormComponent,
      },
      {
        path: 'customers',
        component: AdminUsersComponent,
      },
      {
        path: 'orders',
        component: AdminOrderComponent,
      },
      {
        path: 'schedules',
        component: AdminSchedulesComponent,
      },
      {
        path: 'messages',
        component: AdminMessagesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
