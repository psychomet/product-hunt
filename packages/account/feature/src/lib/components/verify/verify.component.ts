import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@bigi-shop/shared/data-access';
import { VERIFY } from './verify.graphql';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="verify-container">
      <div class="verify-content" [ngSwitch]="verificationState">
        <div *ngSwitchCase="'VERIFYING'" class="verify-message">
          <h2>Set Your Password</h2>
          <p>Please set a password to complete your account verification.</p>
          <form [formGroup]="verifyForm" (ngSubmit)="onSubmit()" class="verify-form">
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                class="form-control"
                [class.is-invalid]="password.invalid && password.touched"
              />
              <div class="invalid-feedback" *ngIf="password.invalid && password.touched">
                <span *ngIf="password.errors?.['required']">Password is required</span>
                <span *ngIf="password.errors?.['minlength']">Password must be at least 8 characters</span>
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                formControlName="confirmPassword"
                class="form-control"
                [class.is-invalid]="confirmPassword.invalid && confirmPassword.touched"
              />
              <div class="invalid-feedback" *ngIf="confirmPassword.invalid && confirmPassword.touched">
                <span *ngIf="confirmPassword.errors?.['required']">Please confirm your password</span>
                <span *ngIf="confirmPassword.errors?.['mismatch']">Passwords do not match</span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              {{ isLoading ? 'Verifying...' : 'Complete Verification' }}
            </button>
          </form>
        </div>

        <div *ngSwitchCase="'SUCCESS'" class="verify-message success">
          <h2>Account Verified!</h2>
          <p>Your account has been successfully verified.</p>
          <p>You will be redirected to sign in...</p>
        </div>

        <div *ngSwitchCase="'ERROR'" class="verify-message error">
          <h2>Verification Failed</h2>
          <p>{{ errorMessage }}</p>
          <p>Please try registering again or contact support if the problem persists.</p>
        </div>

        <div *ngSwitchCase="'EXPIRED'" class="verify-message error">
          <h2>Verification Link Expired</h2>
          <p>The verification link has expired.</p>
          <p>Please request a new verification email.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .verify-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 2rem;
    }

    .verify-content {
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    .verify-message {
      padding: 2rem;
      border-radius: 8px;
      background-color: #f8f9fa;
    }

    .verify-form {
      text-align: left;
      margin-top: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .verify-message h2 {
      margin-bottom: 1rem;
      color: #333;
    }

    .verify-message p {
      margin-bottom: 0.5rem;
      color: #666;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      margin-top: 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
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

    .success {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
    }

    .success h2 {
      color: #155724;
    }

    .error {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
    }

    .error h2 {
      color: #721c24;
    }
  `]
})
export class VerifyComponent implements OnInit {
  verificationState: 'VERIFYING' | 'SUCCESS' | 'ERROR' | 'EXPIRED' = 'VERIFYING';
  errorMessage = '';
  isLoading = false;
  verifyForm: FormGroup;
  private token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.verifyForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.verificationState = 'ERROR';
      this.errorMessage = 'No verification token provided.';
    }
  }

  get password() {
    return this.verifyForm.get('password')!;
  }

  get confirmPassword() {
    return this.verifyForm.get('confirmPassword')!;
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    // if (this.verifyForm.invalid || !this.token) {
    //   return;
    // }

    this.isLoading = true;
    const { password } = this.verifyForm.value;

    this.dataService.mutate(
      VERIFY,
      {
        token: this.token,
        password
      }
    ).subscribe({
      next: () => {
        this.verificationState = 'SUCCESS';
        setTimeout(() => {
          this.router.navigate(['/account/sign-in']);
        }, 3000);
      },
      error: (error) => {
        this.verificationState = 'ERROR';
        this.errorMessage = error.message || 'An unknown error occurred.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
