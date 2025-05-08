// src/app/home-page/directives/scroll-fade.directive.ts

import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollFade]',
})
export class ScrollFadeDirective implements OnInit, OnDestroy {
  @Input() scrollFadeDelay = 0;
  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize element styles only in browser
      this.el.nativeElement.style.opacity = '0';
      this.el.nativeElement.style.transform = 'translateY(20px)';
      this.el.nativeElement.style.transition = `opacity 0.6s ease-out ${this.scrollFadeDelay}ms, transform 0.6s ease-out ${this.scrollFadeDelay}ms`;
    }
  }

  ngOnInit() {
    // Only initialize IntersectionObserver in browser environment
    if (
      isPlatformBrowser(this.platformId) &&
      'IntersectionObserver' in window
    ) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.el.nativeElement.style.opacity = '1';
              this.el.nativeElement.style.transform = 'translateY(0)';

              if (this.observer) {
                this.observer.unobserve(entry.target);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      this.observer.observe(this.el.nativeElement);
    } else {
      // If IntersectionObserver is not available, show the element immediately
      this.el.nativeElement.style.opacity = '1';
      this.el.nativeElement.style.transform = 'translateY(0)';
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
