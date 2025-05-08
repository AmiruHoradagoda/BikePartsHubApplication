import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => in', [
        animate('800ms cubic-bezier(0.25, 0.1, 0.25, 1)')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ opacity: 0, transform: 'translateX(100px)' })),
      state('in', style({ opacity: 0.2, transform: 'translateX(0)' })),
      transition('void => in', [
        animate('1200ms cubic-bezier(0.25, 0.1, 0.25, 1)')
      ])
    ])
  ]
})
export class HeroSectionComponent {

}
