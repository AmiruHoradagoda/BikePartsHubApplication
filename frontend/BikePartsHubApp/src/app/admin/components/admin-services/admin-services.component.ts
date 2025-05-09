import { Component, OnInit } from '@angular/core';
import { ServiceType } from '../../../user/pages/appintment-page/appointment.service';
import { AdminServicesService } from './admin-services.service';
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
export class AdminServicesComponent implements OnInit {
  services: ServiceType[] = [];
  loading = false;
  error: string | null = null;

  constructor(private serviceTypeService: AdminServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.error = null;

    this.serviceTypeService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading services:', err);
        this.error = 'Failed to load services. Please try again.';
        this.loading = false;
      },
    });
  }

  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceTypeService.deleteService(id).subscribe({
        next: () => {
          this.services = this.services.filter((service) => service.id !== id);
        },
        error: (err) => {
          console.error('Error deleting service:', err);
          this.error = 'Failed to delete service. Please try again.';
        },
      });
    }
  }

  addService(): void {
    // Logic to add a new service
    console.log('Add service clicked');
  }
}
