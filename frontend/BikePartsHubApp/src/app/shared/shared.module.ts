import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [SearchBarComponent, HeaderComponent, NavComponent, FooterComponent],
})
export class SharedCommonModule {}
