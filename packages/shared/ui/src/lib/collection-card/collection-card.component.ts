import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { AssetFragment, GetCollectionQuery } from '@product-hunt/shared-util-types';

import { AssetPreviewPipe } from '../asset-preview.pipe';

@Component({
  selector: 'bigi-collection-card',
  imports: [CommonModule, RouterLink, AssetPreviewPipe],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
})
export class CollectionCardComponent {
  collection = input<GetCollectionQuery['collection'] | any>();
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
