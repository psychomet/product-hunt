import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductDetailService, ProductDetail } from '@bigi-shop/products/data-access';

@Component({
  selector: 'lib-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="product$ | async as product">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      
      <div *ngIf="product.featuredAsset">
        <img [src]="product.featuredAsset.preview" [alt]="product.name" width="400">
      </div>
      
      <h3>Variants</h3>
      <div *ngFor="let variant of product.variants">
        <div class="variant-card">
          <h4>{{ variant.name }}</h4>
          <p>Price: {{ variant.price | currency }}</p>
          <p>Price with tax: {{ variant.priceWithTax | currency }}</p>
          <p>SKU: {{ variant.sku }}</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      </div>
      
      <div class="actions">
        <a [routerLink]="['/products']">Back to Products</a>
      </div>
    </div>
  `,
  styles: [`
    .variant-card {
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .add-to-cart {
      background-color: #4CAF50;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .actions {
      margin-top: 2rem;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<ProductDetail>;

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          throw new Error('Product slug is required');
        }
        return this.productDetailService.getProduct(slug);
      })
    );
  }
} 