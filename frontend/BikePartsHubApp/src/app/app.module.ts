import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UserModule,
    AdminModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
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
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
