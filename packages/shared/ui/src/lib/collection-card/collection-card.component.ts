import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetFragment, GetCollectionQuery } from '@bigi-shop/shared-util-types';
import { DomSanitizer } from '@angular/platform-browser';
import { AssetPreviewPipe } from '../asset-preview.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bigi-collection-card',
  imports: [CommonModule, RouterLink, AssetPreviewPipe],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
})
export class CollectionCardComponent {
  collection = input<NonNullable<GetCollectionQuery['collection']>>();
  private sanitizer = inject(DomSanitizer);
    backgroundImage = computed(() => {
      if (this.collection().featuredAsset) {
        const assetPreviewPipe = new AssetPreviewPipe();
        return this.sanitizer.bypassSecurityTrustStyle(
            `url('${assetPreviewPipe.transform(this.collection().featuredAsset as AssetFragment, 400, 150)}')`,
        );
    }
    return ''
    });

    featuredAsset = computed(() => {
      if (this.collection().featuredAsset) {
        return this.collection().featuredAsset as AssetFragment;
      }
      return null;
    });
}
