import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { GetProductsQuery, ProductListOptions } from '../common/generated-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="products$ | async as products">
      <h2>Products</h2>
      <div *ngFor="let product of products.items">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <div *ngIf="product.featuredAsset">
          <img [src]="product.featuredAsset.preview" [alt]="product.name" width="200">
        </div>
        <div *ngFor="let variant of product.variants">
          <p>{{ variant.name }} - {{ variant.price | currency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products$!: Observable<GetProductsQuery['products']>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Since all properties in ProductListOptions are optional (InputMaybe), 
    // we can use a partial object as the options
    this.products$ = this.productService.getProducts({ take: 10 } as ProductListOptions);
  }
} 