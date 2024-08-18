import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductFormComponent } from './pages/admin-page/product-form/product-form.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminOverviewComponent } from './pages/admin-page/admin-overview/admin-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'products',
    component: ProductPageComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      { path: 'overview', component: AdminOverviewComponent },
      // { path: 'orders', component: OrdersComponent }, // Assuming you have this component
      // { path: 'users', component: UsersComponent }, // Assuming you have this component
      // { path: 'reports', component: ReportsComponent }, // Assuming you have this component
      // { path: 'scheduleds', component: ScheduledsComponent }, // Assuming you have this component
      // { path: 'requests', component: RequestsComponent }, // Assuming you have this component
      { path: 'add-product', component: ProductFormComponent },
      // { path: 'services', component: ServicesComponent }, // Assuming you have this component
      // { path: 'details', component: DetailsComponent }, // Assuming you have this component
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
