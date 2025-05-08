import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css',
})
export class ServiceFormComponent {
  serviceForm!: FormGroup;
  durations: string[] = [
    '1 hour',
    '2 hours',
    '3 hours',
    '4 hours',
    'Half day',
    'Full day',
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.serviceForm = this.fb.group({
      serviceId: ['', Validators.required],
      serviceName: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      serviceDuration: ['', Validators.required],
      estimatedCost: ['', Validators.required],
    });
  }

  backToServices(): void {
    this.router.navigate(['/services']);
  }

  addService(): void {
    if (this.serviceForm.valid) {
      console.log('Service data:', this.serviceForm.value);
      // Here you would typically submit the form data to your API
      this.router.navigate(['/services']);
    } else {
      // Mark all fields as touched to trigger validation visuals
      Object.keys(this.serviceForm.controls).forEach((key) => {
        const control = this.serviceForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
