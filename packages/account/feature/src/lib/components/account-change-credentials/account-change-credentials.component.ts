import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataService } from '@bigi-shop/shared-data-access';
import { ChangeEmailAddressMutation, ChangeEmailAddressMutationVariables, ChangePasswordMutation, ChangePasswordMutationVariables } from '@bigi-shop/shared-util-types';

import { CHANGE_EMAIL_ADDRESS, CHANGE_PASSWORD } from './account-change-credentials.graphql';

@Component({
  selector: 'bigi-account-change-credentials',
  imports: [CommonModule, FormsModule],
  templateUrl: './account-change-credentials.component.html',
  styleUrl: './account-change-credentials.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountChangeCredentialsComponent {
  currentPassword = '';
  newPassword = '';
  password = '';
  emailAddress = '';
  changeEmailAddressMessage = '';

  constructor(private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {
  }

  changePassword() {
      this.dataService.mutate<ChangePasswordMutation, ChangePasswordMutationVariables>(CHANGE_PASSWORD, {
          old: this.currentPassword,
          new: this.newPassword,
      })
          .subscribe(() => {
              this.currentPassword = '';
              this.newPassword = '';
              this.changeDetectorRef.markForCheck();
          });
  }

  changeEmailAddress() {
      this.dataService.mutate<ChangeEmailAddressMutation, ChangeEmailAddressMutationVariables>(CHANGE_EMAIL_ADDRESS, {
          password: this.password,
          emailAddress: this.emailAddress,
      })
          .subscribe(() => {
              this.changeEmailAddressMessage = `To complete the process, please check your email (${this.emailAddress}) to verify the address.`;
              this.password = '';
              this.emailAddress = '';
              this.changeDetectorRef.markForCheck();
          });
  }
}
