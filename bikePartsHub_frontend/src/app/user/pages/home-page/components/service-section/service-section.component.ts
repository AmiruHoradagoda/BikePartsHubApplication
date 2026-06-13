import { Component, Input } from '@angular/core';

interface ServiceCard {
  icon: string;
  title: string;
  features: string[];
  price: number;
  isHighlighted?: boolean;
}

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.scss',
})
export class ServiceSectionComponent {
  @Input() scrollFadeDelay: number = 0;
  backgroundImage = 'https://wallpapercave.com/wp/wp8647266.jpg';
  sectionTitle = 'Professional Motorcycle Services';
  sectionDescription =
    'Our certified mechanics provide expert maintenance and repair services to keep your bike performing at its best.';

  services: ServiceCard[] = [
    {
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Basic Tune-Up',
      features: [
        'Oil and filter change',
        'Chain maintenance & adjustment',
        'Tire pressure check & adjust',
        'Multi-point safety inspection',
      ],
      price: 89.99,
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      title: 'Complete Overhaul',
      features: [
        'Complete disassembly & cleaning',
        'Engine & transmission service',
        'Electrical system diagnostics',
        'Precision rebuild & tuning',
      ],
      price: 349.99,
      isHighlighted: true,
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Performance Upgrade',
      features: [
        'Custom ECU remapping',
        'Performance parts installation',
        'Exhaust system optimization',
        'Dyno tuning & performance testing',
      ],
      price: 249.99,
    },
  ];
}