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
      closeButton: true,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation: 'decreasing',
      progressBar: true,
      tapToDismiss: true,
      timeOut: 4000,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
