import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProductHuntService } from '@product-hunt/product-hunt-data-access';
import { ProductSubmissionFormComponent } from '@product-hunt/product-hunt-ui';
import { SubmitProductInput } from '@product-hunt/shared-util-types';

@Component({
  selector: 'ph-product-submission',
  standalone: true,
  imports: [ProductSubmissionFormComponent],
  template: `
    <div class="max-w-2xl mx-auto py-8">
      <h1 class="text-2xl font-bold mb-6">Submit a Product</h1>
      <ph-product-submission-form
        (submitted)="onSubmit($event)"
      ></ph-product-submission-form>
    </div>
  `
})
export class ProductSubmissionComponent {
  constructor(
    private productHuntService: ProductHuntService,
    private router: Router
  ) {}

  onSubmit(input: SubmitProductInput): void {
    this.productHuntService.submitProduct(input).subscribe(
      response => {
        console.log(response);
        // Navigate to the product details page after successful submission
        // this.router.navigate(['/products', response.submitProduct.slug]);
      }
    );
  }
} 