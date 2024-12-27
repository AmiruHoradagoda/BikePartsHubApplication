import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':enter', [
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('scaleIn', [
      state('void', style({ transform: 'scale(0.8)', opacity: 0 })),
      transition(':enter', [
        animate('0.4s ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
    trigger('countUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '1s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomePageComponent {
  testimonials = [
    {
      name: 'Natalie',
      quote: 'I love it! No more endless searching for bike parts.',
      image: '/assets/propic.png',
      rating: 5,
    },
    {
      name: 'George',
      quote: 'If you are a biker, You need this service in your life!',
      image: '/assets/propic.png',
      rating: 5,
    },
    {
      name: 'Raven',
      quote: 'Best deals I have ever seen. Highly recommended!',
      image: '/assets/propic.png',
      rating: 5,
    },
  ];

  stats = [
    { value: '1000', label: 'Products' },
    { value: '500', label: 'Happy Customers' },
    { value: '50', label: 'Expert Mechanics' },
    { value: '24', label: 'Service Hours' },
  ];

  featuredProducts = [
    {
      name: 'Premium Engine Oil',
      description:
        'High-performance synthetic oil for optimal engine protection',
      price: 2500,
      category: 'Engine Oil',
      image: 'assets/product_img/product1.jpg',
    },
    // Add more products...
  ];

  features = [
    {
      icon: 'fas fa-tools',
      title: 'Expert Technicians',
      description:
        'Our certified mechanics have years of experience with all bike brands',
    },
    {
      icon: 'fas fa-clock',
      title: 'Quick Service',
      description: 'Get your bike serviced and back on the road in no time',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Genuine Parts',
      description: 'We only use authentic parts from authorized manufacturers',
    },
  ];

  blogPosts = [
    {
      title: 'Essential Motorcycle Maintenance Tips',
      excerpt:
        'Learn how to keep your bike in top condition with these maintenance tips.',
      category: 'Maintenance',
      image: '/assets/blog-1.jpg',
      author: {
        name: 'John Doe',
        avatar: '/assets/author-1.jpg',
      },
      date: 'Oct 15, 2024',
    },
    // Add more blog posts...
  ];
}
