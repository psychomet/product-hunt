import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  DataService,
  GET_ACTIVE_CUSTOMER,
} from '@bigi-shop/shared-data-access';
import {
  GetActiveCustomerQuery,
  notNullOrUndefined,
  UpdateCustomerDetailsMutation,
  UpdateCustomerDetailsMutationVariables,
  UpdateCustomerInput,
} from '@bigi-shop/shared-util-types';
import { filter, map } from 'rxjs';
import { UPDATE_CUSTOMER_DETAILS } from './account-customer-details.graphql';

@Component({
  selector: 'bigi-account-customer-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-customer-details.component.html',
  styleUrl: './account-customer-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCustomerDetailsComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: UntypedFormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService
      .query<GetActiveCustomerQuery>(GET_ACTIVE_CUSTOMER, {}, 'network-only')
      .pipe(
        map((data) => data.activeCustomer),
        filter(notNullOrUndefined)
      )
      .subscribe((customer) => {
        this.form = this.formBuilder.group({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
        });
        this.changeDetectorRef.markForCheck();
      });
  }

  updateDetails() {
    const formValue = this.form.value;
    const input: UpdateCustomerInput = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phoneNumber: formValue.phoneNumber,
    } as any;
    this.dataService
      .mutate<
        UpdateCustomerDetailsMutation,
        UpdateCustomerDetailsMutationVariables
      >(UPDATE_CUSTOMER_DETAILS, {
        input,
      })
      .subscribe(() => {
        this.form.markAsPristine();
      });
  }
}
