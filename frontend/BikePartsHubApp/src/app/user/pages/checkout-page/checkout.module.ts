import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './checkout-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
})
export class CheckoutModule {}
