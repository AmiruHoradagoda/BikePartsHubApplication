import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentPageComponent } from './pages/appintment-page/appintment-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailsComponent } from './pages/product-page/components/product-details/product-details.component';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductPageModule } from './pages/product-page/product-page.module';
import { CheckoutModule } from './pages/checkout-page/checkout.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AuthModule } from './auth/auth.module';
import { UserDashboadComponent } from './pages/user-dashboad/user-dashboad.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent,
    AppointmentPageComponent,
    CartPageComponent,
    HomePageComponent,
    ProductDetailsComponent,
    UserDashboadComponent,
  ],
  imports: [
    AuthModule,
    CommonModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    ButtonModule,
    ProductPageModule,
    CheckoutModule,
    UserRoutingModule,
  ],
  exports: [HeaderComponent, NavComponent, FooterComponent, UserComponent],
})
export class UserModule {}
