import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPricePipe } from '../format-price.pipe';
import { CartFragment } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-cart-totals',
  imports: [CommonModule, FormatPricePipe],
  templateUrl: './cart-totals.component.html',
  styleUrl: './cart-totals.component.css',
})
export class CartTotalsComponent {
  @Input() cart: CartFragment;
}
