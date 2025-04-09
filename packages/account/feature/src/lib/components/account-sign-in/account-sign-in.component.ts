import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef,Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { DataService, StateService } from '@bigi-shop/shared-data-access';

import { LOGIN } from './account-sign-in.graphql';

@Component({
  selector: 'bigi-account-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sign-in-container">
      <div class="sign-in-box">
        <h1>Sign In</h1>
        
        <form [formGroup]="signInForm" (ngSubmit)="onSubmit()">
          <div class="alert error" *ngIf="invalidCredentials">
            Invalid credentials, please check your email and password
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
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="rememberMe">
              Remember me
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            [disabled]="signInForm.invalid || isLoading"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>

          <div class="links">
            <a routerLink="/account/forgotten-password">Forgot your password?</a>
            <span class="separator">|</span>
            <a routerLink="/account/register">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .sign-in-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
      padding: 2rem;
    }

    .sign-in-box {
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

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
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
    }

    .links a:hover {
      text-decoration: underline;
    }

    .separator {
      margin: 0 0.5rem;
      color: #666;
    }
  `]
})
export class AccountSignInComponent {
  signInForm: FormGroup;
  isLoading = false;
  invalidCredentials = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private stateService: StateService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get email() {
    return this.signInForm.get('email')!;
  }

  get password() {
    return this.signInForm.get('password')!;
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password, rememberMe } = this.signInForm.value;

    this.dataService.mutate(
      LOGIN,
      {
        email,
        password,
        rememberMe
      }
    ).subscribe({
      next: ({ login }) => {
        switch (login.__typename) {
          case 'CurrentUser':
            this.stateService.setCurrentUser(login);
            this.router.navigate(['/']);
            break;
          case 'InvalidCredentialsError':
          case 'NativeAuthStrategyError':
            this.displayCredentialsError();
            break;
        }
        this.isLoading = false;
      },
      error: () => {
        this.displayCredentialsError();
        this.isLoading = false;
      }
    });
  }

  private displayCredentialsError() {
    this.invalidCredentials = false;
    this.changeDetector.markForCheck();
    setTimeout(() => {
      this.invalidCredentials = true;
      this.changeDetector.markForCheck();
    }, 50);
  }
} 