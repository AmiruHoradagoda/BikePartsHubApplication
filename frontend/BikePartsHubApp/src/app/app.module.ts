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

@NgModule({
  declarations: [AppComponent, AdminPageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ProductFormComponent
],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
