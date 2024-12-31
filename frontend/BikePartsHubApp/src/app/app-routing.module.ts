import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductDetailsComponent } from './pages/product-page/components/product-details/product-details.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AppointmentPageComponent } from './pages/appintment-page/appintment-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'userdashbord',
    component: UserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
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
    path: 'starter',
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
