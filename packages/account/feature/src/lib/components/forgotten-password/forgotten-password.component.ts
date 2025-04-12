import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '@product-hunt/shared-data-access';
import {
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables,
} from '@product-hunt/shared-util-types';

import { REQUEST_PASSWORD_RESET } from './forgotten-password.graphql';

@Component({
  selector: 'bigi-forgotten-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ForgottenPasswordComponent {
  emailAddress = '';
  submitted = false;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.emailAddress = this.route.snapshot.paramMap.get('email') ?? '';
  }

  resetPassword() {
    this.dataService
      .mutate<
        RequestPasswordResetMutation,
        RequestPasswordResetMutationVariables
      >(REQUEST_PASSWORD_RESET, {
        emailAddress: this.emailAddress,
      })
      .subscribe(() => {
        this.submitted = true;
      });
  }
}
