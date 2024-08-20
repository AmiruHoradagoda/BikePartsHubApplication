import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAdminPage = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      // Check if the current route starts with '/admin'
      this.isAdminPage = this.router.url.startsWith('/admin');
    });
  }

  title = 'BikePartsHubApp';
}
