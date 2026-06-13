import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServicesService } from '../admin-services.service';
import { ServiceType } from '../../../../user/pages/appintment-page/appointment.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'], // or .sass
})
export class ServiceFormComponent implements OnInit {
  serviceForm!: FormGroup;
  isEditMode = false;
  serviceId?: number;
  loading = false;
  error: string | null = null;

  // Duration options in hours
  durations: number[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceTypeService: AdminServicesService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Check if we're in edit mode
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      console.log('Route param id:', idParam); // Debug log

      if (idParam) {
        this.serviceId = +idParam;
        this.isEditMode = true;
        this.loadServiceData(this.serviceId);
      }
    });
  }

  initForm(): void {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: ['', Validators.required],
      serviceDuration: ['', Validators.required],
      serviceCost: ['', [Validators.required, Validators.min(0)]],
      features: this.fb.array([this.fb.control('')]),
    });
  }

  // Getter for easy access to features form array
  get featuresArray(): FormArray {
    return this.serviceForm.get('features') as FormArray;
  }

  // Add a new feature input field
  addFeature(): void {
    this.featuresArray.push(this.fb.control(''));
  }

  // Remove a feature at specific index
  removeFeature(index: number): void {
    this.featuresArray.removeAt(index);
  }

  loadServiceData(id: number): void {
    this.loading = true;
    this.serviceTypeService.getServiceById(id).subscribe({
      next: (service) => {
        console.log('Loaded service:', service); // Debug log

        // Reset the features array
        while (this.featuresArray.length !== 0) {
          this.featuresArray.removeAt(0);
        }

        // Add existing features
        if (service.features && service.features.length > 0) {
          service.features.forEach((feature) => {
            this.featuresArray.push(this.fb.control(feature));
          });
        } else {
          // Add at least one empty field
          this.addFeature();
        }

        // Set form values
        this.serviceForm.patchValue({
          serviceName: service.serviceName,
          description: service.description,
          serviceDuration: service.serviceDuration,
          serviceCost: service.serviceCost,
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading service:', err);
        this.error = 'Failed to load service data. Please try again.';
        this.loading = false;
      },
    });
  }

  saveService(): void {
    if (this.serviceForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.serviceForm.controls).forEach((key) => {
        const control = this.serviceForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    const formData = this.serviceForm.value;

    // Filter out empty feature strings
    const filteredFeatures = formData.features.filter(
      (f: string) => f.trim() !== ''
    );

    const serviceData: ServiceType = {
      id: this.serviceId || 0,
      serviceName: formData.serviceName,
      serviceDuration: formData.serviceDuration,
      serviceCost: formData.serviceCost,
      description: formData.description,
      features: filteredFeatures,
    };

    this.loading = true;

    if (this.isEditMode && this.serviceId) {
      console.log('Updating service with ID:', this.serviceId); // Debug log

      // Update existing service
      this.serviceTypeService
        .updateService(this.serviceId, serviceData)
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/admin/services']);
          },
          error: (err) => {
            console.error('Error updating service:', err);
            this.error = 'Failed to update service. Please try again.';
            this.loading = false;
          },
        });
    } else {
      // Create new service
      this.serviceTypeService.createService(serviceData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/services']);
        },
        error: (err) => {
          console.error('Error creating service:', err);
          this.error = 'Failed to create service. Please try again.';
          this.loading = false;
        },
      });
    }
  }

  backToServices(): void {
    this.router.navigate(['/admin/service']);
  }
}
