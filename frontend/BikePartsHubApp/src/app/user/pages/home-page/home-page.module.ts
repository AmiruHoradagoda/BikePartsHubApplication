import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { PopularProductSectionComponent } from './components/popular-product-section/popular-product-section.component';
import { ServiceSectionComponent } from './components/service-section/service-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { AboutusSectionComponent } from './components/aboutus-section/aboutus-section.component';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ScrollFadeDirective } from './scroll-fade.directive';

@NgModule({
  declarations: [
    HeroSectionComponent,
    CategoriesSectionComponent,
    PopularProductSectionComponent,
    ServiceSectionComponent,
    TestimonialsSectionComponent,
    AboutusSectionComponent,
    HomePageComponent,
    ScrollFadeDirective,
  ],
  imports: [CommonModule, FormsModule, CarouselModule, ButtonModule, TagModule],
  exports: [
    HeroSectionComponent,
    CategoriesSectionComponent,
    PopularProductSectionComponent,
    ServiceSectionComponent,
    TestimonialsSectionComponent,
    AboutusSectionComponent,
    CarouselModule,
    ButtonModule,
    TagModule,
  ],
})
export class HomePageModule {}
