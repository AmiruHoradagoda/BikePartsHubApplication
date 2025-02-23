// home-page.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
}

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  bike: string;
  comment: string;
  rating: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  newsletterEmail: string = '';
  private intersectionObserver: IntersectionObserver | null = null;

  brands: string[] = [
    'Honda',
    'Kawasaki',
    'Yamaha',
    'Suzuki',
    'Ducati',
    'Harley-Davidson',
    'BMW',
    'Triumph',
    'KTM',
    'Aprilia',
    'MV Agusta',
    'Indian',
  ];

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'James Mitchell',
      initials: 'JM',
      bike: 'Honda CBR1000RR owner',
      comment:
        'The performance exhaust I purchased from CycleTech completely transformed my ride. Not only does it sound incredible, but I noticed a real improvement in power delivery. Installation service was top-notch and the staff was incredibly knowledgeable.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Delgado',
      initials: 'SD',
      bike: 'Ducati Monster owner',
      comment:
        "I've been bringing my Ducati to CycleTech for service for over 3 years. Their mechanics understand these bikes inside and out. The maintenance packages are reasonably priced and I always leave confident that my bike is in perfect condition.",
      rating: 5,
    },
    {
      id: 3,
      name: 'Robert Kim',
      initials: 'RK',
      bike: 'Kawasaki Ninja owner',
      comment:
        'The premium brake kit I ordered arrived faster than expected, and the quality exceeded my expectations. Installation was straightforward thanks to the included instructions. Stopping power has improved dramatically - worth every penny!',
      rating: 5,
    },
  ];

  hotDeals: Product[] = [
    {
      id: 1,
      name: 'Premium Billet Handlebar',
      imageUrl: '/api/placeholder/800/600',
      originalPrice: 199.99,
      discountedPrice: 159.99,
      discount: 20,
      rating: 4.8,
      reviewCount: 120,
    },
    {
      id: 2,
      name: 'Sport Bike Tire Set',
      imageUrl: '/api/placeholder/800/600',
      originalPrice: 289.99,
      discountedPrice: 246.49,
      discount: 15,
      rating: 4.6,
      reviewCount: 85,
    },
    {
      id: 3,
      name: 'Performance Brake Kit',
      imageUrl: '/api/placeholder/800/600',
      originalPrice: 399.99,
      discountedPrice: 299.99,
      discount: 25,
      rating: 4.9,
      reviewCount: 150,
    },
    {
      id: 4,
      name: 'Premium Exhaust System',
      imageUrl: '/api/placeholder/800/600',
      originalPrice: 829.99,
      discountedPrice: 579.99,
      discount: 30,
      rating: 4.7,
      reviewCount: 95,
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIntersectionObserver();
      this.setupScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  private initializeIntersectionObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              this.intersectionObserver?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );
    }
  }

  private setupScrollAnimations(): void {
    if (this.intersectionObserver) {
      setTimeout(() => {
        const animatedElements =
          document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((element) => {
          this.intersectionObserver?.observe(element);
        });
      }, 0);
    }
  }

  getStarRating(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  async subscribeToNewsletter(): Promise<void> {
    try {
      console.log('Subscribing email:', this.newsletterEmail);
      alert('Thank you for subscribing!');
      this.newsletterEmail = '';
    } catch (error) {
      console.error('Subscription error:', error);
      alert(
        'There was an error processing your subscription. Please try again.'
      );
    }
  }

  calculateDiscount(original: number, discounted: number): number {
    return Math.round(((original - discounted) / original) * 100);
  }
}
