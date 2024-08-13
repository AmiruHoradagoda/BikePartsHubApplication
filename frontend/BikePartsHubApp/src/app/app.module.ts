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
import { ProductFormComponent } from './pages/admin-page/product-form/product-form.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideHttpClient, withFetch } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, AdminPageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ProductFormComponent,
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
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
