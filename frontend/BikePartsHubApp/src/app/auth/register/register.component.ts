import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {}

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { mismatch: true }
      : null;
  }

  // Getter for form controls
  get f() {
    return this.registerForm.controls;
  }

  // Method to show or hide the password
  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.showPassword = !this.showPassword;
    } else if (controlName === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Method to get error messages for each form control
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('minlength')) {
      return `${controlName} must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
    } else if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    } else if (control?.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  // Submit method
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = this.registerForm.value;
    this.authService.register(registerData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
