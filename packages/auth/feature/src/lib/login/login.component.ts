import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthError } from '@bigi-shop/auth/data-access';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Email</label>
          <input
            type="email"
            id="username"
            formControlName="username"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('username')"
          />
          <div class="invalid-feedback" *ngIf="isFieldInvalid('username')">
            Please enter a valid email address
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
            Password is required
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" formControlName="rememberMe"> Remember me
          </label>
        </div>

        <div class="alert alert-danger" *ngIf="error">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <div class="mt-3">
          <a routerLink="/auth/register">Don't have an account? Register here</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
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
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.loginForm.get(field);
    return formControl ? formControl.invalid && formControl.touched : false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = null;

      const { username, password, rememberMe } = this.loginForm.value;

      this.authService.login(username, password, rememberMe).subscribe({
        next: (result) => {
          if ('errorCode' in result) {
            const error = result as AuthError;
            this.error = error.message;
          } else {
            // Successful login
            this.router.navigate(['/']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'An unexpected error occurred. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
} 