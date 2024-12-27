import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductFormComponent } from './pages/admin-page/product-form/product-form.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminOverviewComponent } from './pages/admin-page/admin-overview/admin-overview.component';
import { AdminProductsComponent } from './pages/admin-page/admin-products/admin-products.component';
import { ProductDetailsComponent } from './pages/product-page/product-details/product-details.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AppointmentPageComponent } from './pages/appintment-page/appintment-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'appointment',
    component: AppointmentPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'products',
    component: ProductPageComponent,
  },
  {
    path: 'product-name/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'admin',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
