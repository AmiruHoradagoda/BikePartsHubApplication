import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr'; // Toastr Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    AppModule,
    CommonModule,
    ServerModule,
    BrowserAnimationsModule, // required for Toastr
    ToastrModule.forRoot({
      timeOut: 3000, // Customize options like timeout
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
