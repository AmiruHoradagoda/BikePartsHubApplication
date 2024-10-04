import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AdminSideNavbarComponent } from "./pages/admin-page/admin-side-navbar/admin-side-navbar.component";
import { ProductFormComponent } from "./pages/admin-page/product-form/product-form.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductDetailsComponent } from './pages/product-page/product-details/product-details.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SearchBarComponent } from "./shared/components/search-bar/search-bar.component";

@NgModule({
  declarations: [AppComponent, AdminPageComponent, ProductDetailsComponent, UserPageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
        apiKey: 'AIzaSyCjRYdIsP6hnMnski-spc1pWuJwjA_7mNI',
        authDomain: 'bikepartshubapp.firebaseapp.com',
        projectId: 'bikepartshubapp',
        storageBucket: 'bikepartshubapp.appspot.com',
        messagingSenderId: '778797142877',
        appId: '1:778797142877:web:fd53dc57fcbe02e0f8ceb4',
        measurementId: 'G-5FKWWRNX6C',
    }),
    AdminSideNavbarComponent,
    ProductFormComponent,
    BrowserAnimationsModule, // required for animations
    ToastrModule.forRoot(),
    SearchBarComponent
],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
