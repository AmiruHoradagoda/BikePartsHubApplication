import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminPageComponent } from './admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'overview', component: AdminOverviewComponent },
      // { path: 'orders', component: OrdersComponent },
      // { path: 'users', component: UsersComponent },
      // { path: 'reports', component: ReportsComponent },
      // { path: 'scheduleds', component: ScheduledsComponent },
      // { path: 'requests', component: RequestsComponent },
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
      // { path: 'services', component: ServicesComponent },
      // { path: 'details', component: DetailsComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
