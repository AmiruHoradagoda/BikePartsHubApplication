import { Component, Input } from '@angular/core';
interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-aboutus-section',
  templateUrl: './aboutus-section.component.html',
})
export class AboutusSectionComponent {
  @Input() scrollFadeDelay: number = 0;
  features: Feature[] = [
    {
      icon: 'shield',
      title: 'Quality Guarantee',
      description: 'All products backed by our satisfaction guarantee',
    },
    {
      icon: 'clock',
      title: 'Fast Delivery',
      description: 'Quick shipping on all in-stock items',
    },
    {
      icon: 'award',
      title: 'Expert Advice',
      description: 'Certified technicians to assist you',
    },
    {
      icon: 'users',
      title: 'Community Events',
      description: 'Regular rider meetups and workshops',
    },
  ];
}
