import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@bigi-shop/shared-data-access';
import { ActivatedRoute } from '@angular/router';
import {
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables,
} from '@bigi-shop/shared-util-types';
import { REQUEST_PASSWORD_RESET } from './forgotten-password.graphql';
import { FormsModule } from '@angular/forms';

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
