import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsQuery } from '@bigi-shop/shared-util-types';
import { RouterLink } from '@angular/router';
import { AssetPreviewPipe } from '../asset-preview.pipe';
import { FormatPricePipe } from '../format-price.pipe';

@Component({
  selector: 'bigi-product-card',
  imports: [CommonModule, RouterLink, AssetPreviewPipe, FormatPricePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input<SearchProductsQuery['search']['items'][number]>();
}
