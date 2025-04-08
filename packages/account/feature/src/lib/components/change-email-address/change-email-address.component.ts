import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, StateService } from '@bigi-shop/shared-data-access';
import {
  VerifyChangeEmailAddressMutation,
  VerifyChangeEmailAddressMutationVariables,
} from '@bigi-shop/shared-util-types';
import { VERIFY_CHANGE_EMAIL_ADDRESS } from './change-email-address.graphql';

@Component({
  selector: 'bigi-change-email-address',
  imports: [CommonModule],
  templateUrl: './change-email-address.component.html',
  styleUrl: './change-email-address.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeEmailAddressComponent implements OnInit {
  message = 'Verifying new email address...';
  state: 'error' | 'success' | 'pending' = 'pending';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.verify();
  }

  verify() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.dataService
        .mutate<
          VerifyChangeEmailAddressMutation,
          VerifyChangeEmailAddressMutationVariables
        >(VERIFY_CHANGE_EMAIL_ADDRESS, {
          token,
        })
        .subscribe(
          () => {
            this.message = 'Your new email address has been verified!';
            this.state = 'success';
          },
          (err) => {
            this.state = 'error';
            this.message = err.message;
          }
        );
    } else {
      this.message = 'No token provided! Cannot verify email address.';
      this.state = 'error';
    }
  }
}
