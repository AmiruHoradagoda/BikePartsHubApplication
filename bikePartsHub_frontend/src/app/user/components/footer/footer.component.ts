import { Component, OnInit } from '@angular/core';

interface Link {
  label: string;
  link: string;
}

interface SocialLink {
  icon: string;
  link: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  socialLinks: SocialLink[] = [
    { icon: 'fab fa-facebook', link: '#', label: 'Facebook' },
    { icon: 'fab fa-twitter', link: '#', label: 'Twitter' },
    { icon: 'fab fa-instagram', link: '#', label: 'Instagram' },
    { icon: 'fab fa-youtube', link: '#', label: 'YouTube' },
  ];

  discoveryLinks: Link[] = [
    { label: 'Home', link: '/' },
    { label: 'Shop Parts', link: '/parts' },
    { label: 'Services', link: '/services' },
    { label: 'Hot Deals', link: '/deals' },
    { label: 'About Us', link: '/about' },
    { label: 'Contact', link: '/contact' },
    { label: 'Blog', link: '/blog' },
  ];

  aboutLinks: Link[] = [
    { label: 'My Account', link: '/account' },
    { label: 'Order Tracking', link: '/track-order' },
    { label: 'Wish List', link: '/wishlist' },
    { label: 'Returns & Warranty', link: '/returns' },
    { label: 'Shipping Policy', link: '/shipping' },
    { label: 'Privacy Policy', link: '/privacy' },
    { label: 'Terms of Service', link: '/terms' },
  ];

  constructor() {}

  ngOnInit(): void {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}