import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface SocialLink {
  icon: string;
  link: string;
  label: string;
}

interface FooterLink {
  label: string;
  link: string;
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FooterComponent {
  socialLinks: SocialLink[] = [
    { icon: 'fab fa-facebook-f', link: '#', label: 'Facebook' },
    { icon: 'fab fa-twitter', link: '#', label: 'Twitter' },
    { icon: 'fab fa-instagram', link: '#', label: 'Instagram' },
    { icon: 'fab fa-youtube', link: '#', label: 'YouTube' },
  ];

  discoveryLinks: FooterLink[] = [
    { label: 'Latest Products', link: '#' },
    { label: 'Most Searched', link: '#' },
    { label: 'Most Sold', link: '#' },
    { label: 'Special Offers', link: '#' },
  ];

  aboutLinks: FooterLink[] = [
    { label: 'Help Center', link: '#' },
    { label: 'Delivery Info', link: '#' },
    { label: 'BPH Team', link: '#' },
    { label: 'Careers', link: '#' },
  ];

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
