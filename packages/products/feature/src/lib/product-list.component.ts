import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from '@bigi-shop/products-data-access';
import { GetProductsQuery, ProductListOptions } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'lib-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="products$ | async as products">
      <h2>Products</h2>
      <div *ngFor="let product of products.items">
        <h3>
          <a [routerLink]="['/product', product.slug]">{{ product.name }}</a>
        </h3>
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
    this.products$ = this.productService.getProducts({ take: 10 } as ProductListOptions)
      .pipe(map(result => result.products));
  }
} 