import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService, StateService } from '@product-hunt/shared-data-access';
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from '@product-hunt/shared-util-types';

import { RESET_PASSWORD } from './reset-password.graphql';

@Component({
  selector: 'bigi-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  password = '';
  error = '';
  private readonly token: string | undefined;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || undefined;
    if (!this.token) {
      this.error = 'No token provided! Cannot reset password.';
    }
  }

  confirmPasswordReset() {
    if (this.token) {
      this.dataService
        .mutate<ResetPasswordMutation, ResetPasswordMutationVariables>(
          RESET_PASSWORD,
          {
            token: this.token,
            password: this.password,
          }
        )
        .subscribe(() => {
          this.stateService.setState('signedIn', true);
          this.router.navigate(['/account']);
        });
    }
  }
}
