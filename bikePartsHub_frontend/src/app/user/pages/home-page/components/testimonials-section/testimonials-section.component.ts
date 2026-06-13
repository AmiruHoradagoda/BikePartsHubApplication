import { Component, Input } from '@angular/core';
interface Testimonial {
  id: number;
  name: string;
  initials: string;
  bike: string;
  comment: string;
  rating: number;
}
@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.css',
})
export class TestimonialsSectionComponent {
  @Input() scrollFadeDelay: number = 0;
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
}
