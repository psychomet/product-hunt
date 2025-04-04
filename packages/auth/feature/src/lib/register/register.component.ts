import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthError, RegisterInput } from '@bigi-shop/auth/data-access';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <h2>Create Account</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            formControlName="emailAddress"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('emailAddress')"
          />
          <div class="invalid-feedback" *ngIf="isFieldInvalid('emailAddress')">
            Please enter a valid email address
          </div>
        </div>

        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            formControlName="firstName"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('firstName')"
          />
          <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
            First name is required
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            formControlName="lastName"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('lastName')"
          />
          <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
            Last name is required
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            formControlName="password"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('password')"
          />
          <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
            Password must be at least 8 characters long and contain at least one uppercase letter,
            one lowercase letter, and one number
          </div>
        </div>

        <div class="alert alert-danger" *ngIf="error">
          {{ error }}
        </div>

        <div class="alert alert-success" *ngIf="success">
          Registration successful! Please check your email to verify your account.
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || isLoading">
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>

        <div class="mt-3">
          <a routerLink="/auth/login">Already have an account? Login here</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .alert {
      padding: 0.75rem;
      margin-bottom: 1rem;
      border-radius: 4px;
    }

    .alert-danger {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .alert-success {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.registerForm.get(field);
    return formControl ? formControl.invalid && formControl.touched : false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.success = false;

      const registerData: RegisterInput = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (result) => {
          if ('errorCode' in result) {
            const error = result as AuthError;
            this.error = error.message;
          } else {
            this.success = true;
            // Redirect to login after 2 seconds
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'An unexpected error occurred. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
} 