import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '@bigi-shop/shared-data-access';
import { REGISTER } from './register.graphql';

@Component({
  selector: 'bigi-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-box">
        <h1>Create Account</h1>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="alert error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <div class="alert success" *ngIf="successMessage">
            {{ successMessage }}
          </div>

          <div class="form-group">
            <label for="firstName">First name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              formControlName="firstName"
              [class.is-invalid]="firstName.invalid && firstName.touched"
            />
            <div class="invalid-feedback" *ngIf="firstName.invalid && firstName.touched">
              <span *ngIf="firstName.errors?.['required']">First name is required</span>
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Last name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              formControlName="lastName"
              [class.is-invalid]="lastName.invalid && lastName.touched"
            />
            <div class="invalid-feedback" *ngIf="lastName.invalid && lastName.touched">
              <span *ngIf="lastName.errors?.['required']">Last name is required</span>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              formControlName="email"
              [class.is-invalid]="email.invalid && email.touched"
            />
            <div class="invalid-feedback" *ngIf="email.invalid && email.touched">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              formControlName="password"
              [class.is-invalid]="password.invalid && password.touched"
            />
            <div class="invalid-feedback" *ngIf="password.invalid && password.touched">
              <span *ngIf="password.errors?.['required']">Password is required</span>
              <span *ngIf="password.errors?.['minlength']">Password must be at least 8 characters</span>
            </div>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            [disabled]="registerForm.invalid || isLoading"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div class="links">
            Already have an account?
            <a routerLink="/account/sign-in">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 600px;
      padding: 2rem;
    }

    .register-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .alert {
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .alert.error {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .alert.success {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .links {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.875rem;
    }

    .links a {
      color: #007bff;
      text-decoration: none;
      margin-left: 0.5rem;
    }

    .links a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get firstName() {
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { firstName, lastName, email, password } = this.registerForm.value;

    this.dataService.mutate(
      REGISTER,
      {
        input: {
          firstName,
          lastName,
          emailAddress: email,
          password
        }
      }
    ).subscribe({
      next: ({ data }: any) => {
        const result = data?.registerCustomerAccount;

        if (result?.success) {
          this.successMessage = 'Registration successful! Please check your email to verify your account.';
          this.registerForm.reset();
        } else {
          this.errorMessage = result?.message || 'An error occurred during registration';
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred during registration';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
