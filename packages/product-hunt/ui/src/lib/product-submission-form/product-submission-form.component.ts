import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitProductInput } from '@product-hunt/shared-util-types';

@Component({
  selector: 'ph-product-submission-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          id="name"
          formControlName="name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          formControlName="description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label for="websiteUrl" class="block text-sm font-medium text-gray-700">Website URL</label>
        <input
          type="url"
          id="websiteUrl"
          formControlName="websiteUrl"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="launchDate" class="block text-sm font-medium text-gray-700">Launch Date</label>
        <input
          type="datetime-local"
          id="launchDate"
          formControlName="launchDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        [disabled]="form.invalid || form.pristine"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Submit Product
      </button>
    </form>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductSubmissionFormComponent {
  @Output() submitted = new EventEmitter<SubmitProductInput>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      websiteUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      launchDate: [''],
      makers: [[]], // This will be populated with the current user's ID
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const launchDate = formValue.launchDate ? new Date(formValue.launchDate).toISOString() : null;
      
      this.submitted.emit({
        ...formValue,
        launchDate
      });
    }
  }
} 