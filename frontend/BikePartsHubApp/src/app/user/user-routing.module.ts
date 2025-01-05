import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppointmentPageComponent } from './pages/appintment-page/appintment-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailsComponent } from './pages/product-page/components/product-details/product-details.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { UserDashboadComponent } from './pages/user-dashboad/user-dashboad.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'userdashbord',
        component: UserDashboadComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
