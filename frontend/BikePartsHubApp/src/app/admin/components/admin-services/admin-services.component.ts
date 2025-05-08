import { Component } from '@angular/core';
interface Service {
  id: number;
  serviceId: string;
  name: string;
  duration: string;
  estimatedPrice: string;
}
@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.sass',
})
export class AdminServicesComponent {
  services: Service[] = [];

  constructor() {}

  ngOnInit(): void {
    // Populate with dummy data
    this.services = this.getDummyServices();
  }

  getDummyServices(): Service[] {
    const dummyServices: Service[] = [];

    for (let i = 1; i <= 7; i++) {
      dummyServices.push({
        id: i,
        serviceId: '#01470523',
        name: '4/45, Spring Vally Rd, Hindagoda, Badulla 90000',
        duration: '20/01/2025',
        estimatedPrice: 'Rs 47200',
      });
    }

    return dummyServices;
  }

  deleteService(id: number): void {
    this.services = this.services.filter((service) => service.id !== id);
  }

  addService(): void {
    // Logic to add a new service
    console.log('Add service clicked');
  }
}
