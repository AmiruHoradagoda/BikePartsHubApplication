import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG imports
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

// Component imports
import { AppointmentPageComponent } from './pages/appintment-page/appintment-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UserComponent } from './user.component';

// Module imports
import { AuthModule } from './auth/auth.module';
import { ProductPageModule } from './pages/product-page/product-page.module';
import { CheckoutModule } from './pages/checkout-page/checkout.module';
import { UserRoutingModule } from './user-routing.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { AboutusPageComponent } from './pages/aboutus-page/aboutus-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';

@NgModule({
  declarations: [
    UserComponent,
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    AppointmentPageComponent,
    CartPageComponent,
    UserDashboardComponent,
    AboutusPageComponent,
    NotificationComponent,
    OrderConfirmationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule,
    AuthModule,
    ProductPageModule,
    CheckoutModule,
    HomePageModule,
    // PrimeNG Modules
    CalendarModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  providers: [MessageService],
  exports: [HeaderComponent, FooterComponent, UserComponent],
})
export class UserModule {}
